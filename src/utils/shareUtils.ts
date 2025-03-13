import jsPDF from 'jspdf';
import { CardData } from './types';
import QRCode from 'qrcode';

export const shareViaEmail = (subject: string, body: string): void => {
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const generateEmailContent = (cardData: CardData): { subject: string, body: string } => {
    const subject = `Tarjeta de Contacto - ${cardData.name}`;

    const body = `
📇 Tarjeta de Contacto - ${cardData.name}

👤 Información de Contacto:
${cardData.title ? `📋 Cargo: ${cardData.title}\n` : ''}${cardData.company ? `🏢 Empresa: ${cardData.company}\n` : ''}${cardData.phone ? `📞 Teléfono: ${cardData.phone}\n` : ''}${cardData.mobile ? `📱 Móvil: ${cardData.mobile}\n` : ''}${cardData.email ? `📧 Email: ${cardData.email}\n` : ''}${cardData.website ? `🌐 Sitio Web: ${cardData.website}\n` : ''}

${(cardData.address || cardData.city || cardData.postalCode) ? `📍 Ubicación:\n${cardData.address ? `${cardData.address}\n` : ''}${[cardData.city, cardData.postalCode].filter(Boolean).join(', ')}` : ''}

--
Esta tarjeta fue creada usando Business Card Generator`.trim();

    return { subject, body };
};

export const generatePDF = async (cardData: CardData): Promise<void> => {
    // Crear PDF con dimensiones correctas y mayor calidad
    const doc = new jsPDF({
        orientation: cardData.orientation === 'horizontal' ? 'landscape' : 'portrait',
        unit: 'mm',
        format: cardData.orientation === 'horizontal' ? [90, 50] : [50, 90],
        hotfixes: ['px_scaling']
    });

    // Convertir colores hex a RGB
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    };

    const primaryRgb = hexToRgb(cardData.primaryColor);
    const secondaryRgb = hexToRgb(cardData.secondaryColor);
    const textRgb = hexToRgb(cardData.textColor);

    // Función para crear fondo sólido
    const createBackground = (color: { r: number, g: number, b: number }) => {
        const width = cardData.orientation === 'horizontal' ? 90 : 50;
        const height = cardData.orientation === 'horizontal' ? 50 : 90;
        doc.setFillColor(color.r, color.g, color.b);
        doc.rect(0, 0, width, height, 'F');
    };

    // FRENTE
    // Agregar sombra y bordes redondeados
    doc.setFillColor(220, 220, 220);
    doc.roundedRect(-0.5, -0.5, (cardData.orientation === 'horizontal' ? 91 : 51), (cardData.orientation === 'horizontal' ? 51 : 91), 3, 3, 'F');
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(0, 0, (cardData.orientation === 'horizontal' ? 90 : 50), (cardData.orientation === 'horizontal' ? 50 : 90), 3, 3, 'F');

    // Fondo sólido
    createBackground(secondaryRgb);

    // Logo
    if (cardData.logo) {
        try {
            const logoSize = cardData.orientation === 'horizontal' ? 22 : 18;
            const logoX = (cardData.orientation === 'horizontal' ? 90 : 50) / 2 - (logoSize / 2);
            const logoY = cardData.orientation === 'horizontal' ? 4 : 6;
            doc.addImage(cardData.logo, 'PNG', logoX, logoY, logoSize, logoSize);
        } catch (error) {
            console.error('Error adding logo to PDF:', error);
        }
    }

    // Calcular posiciones de texto
    const startY = cardData.orientation === 'horizontal'
        ? (cardData.logo ? 32 : 20)
        : (cardData.logo ? 35 : 25);
    const centerX = cardData.orientation === 'horizontal' ? 45 : 25;

    // Texto del frente
    doc.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);

    // Nombre
    const nameSize = cardData.orientation === 'horizontal' ? 16 : 14;
    doc.setFontSize(nameSize);
    doc.setFont('helvetica', 'bold');
    doc.text(cardData.name, centerX, startY, { align: 'center' });

    // Título
    if (cardData.title) {
        const titleSize = nameSize * 0.65;
        doc.setFontSize(titleSize);
        doc.setFont('helvetica', 'normal');
        doc.text(cardData.title, centerX, startY + (nameSize * 0.5), { align: 'center' });
    }

    // Empresa
    if (cardData.company) {
        const companySize = nameSize * 0.55;
        doc.setFontSize(companySize);
        doc.setFont('helvetica', 'normal');
        doc.text(cardData.company.toUpperCase(), centerX, startY + (nameSize * 0.95), { align: 'center' });
    }

    // DORSO
    doc.addPage();

    // Sombra y bordes redondeados para el dorso
    doc.setFillColor(220, 220, 220);
    doc.roundedRect(-0.5, -0.5, (cardData.orientation === 'horizontal' ? 91 : 51), (cardData.orientation === 'horizontal' ? 51 : 91), 3, 3, 'F');
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(0, 0, (cardData.orientation === 'horizontal' ? 90 : 50), (cardData.orientation === 'horizontal' ? 50 : 90), 3, 3, 'F');

    // Fondo sólido
    createBackground(primaryRgb);

    // Primero dibujamos el QR code si existe teléfono
    const phoneNumber = cardData.phone || cardData.mobile;
    if (phoneNumber) {
        try {
            // Ajustar tamaño y posición del QR (reducido y reposicionado)
            const qrSize = cardData.orientation === 'horizontal' ? 25 : 20;
            const qrX = cardData.orientation === 'horizontal' ? 60 : 15;
            const qrY = cardData.orientation === 'horizontal' ? 12.5 : 10;

            // Fondo blanco para el QR
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, 2, 2, 'F');

            // Generar QR code
            const qrDataUrl = await QRCode.toDataURL(`tel:${phoneNumber}`, {
                width: 1000,
                margin: 0,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                },
                errorCorrectionLevel: 'H'
            });

            // Agregar QR code
            doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
        } catch (error) {
            console.error('Error adding QR code to PDF:', error);
        }
    }

    // Luego agregamos el contenido del dorso
    doc.setTextColor(textRgb.r, textRgb.g, textRgb.b);
    const fontSize = cardData.orientation === 'horizontal' ? 8 : 7;
    doc.setFontSize(fontSize);

    const margin = cardData.orientation === 'horizontal' ? 6 : 4;
    let currentY = cardData.orientation === 'horizontal' ? 10 : 45;
    const lineSpacing = fontSize * 1.1;

    // Función para agregar elementos de contacto con espacio ajustado
    const addContactItem = (icon: string, value: string) => {
        const maxWidth = cardData.orientation === 'horizontal'
            ? (phoneNumber ? 50 : 80)  // Ajustado para compensar el espacio extra
            : (phoneNumber ? 42 : 45);  // Ajustado para vertical

        doc.setFont('helvetica', 'bold');
        doc.text(icon + ':', margin, currentY);

        doc.setFont('helvetica', 'normal');
        const iconWidth = doc.getTextWidth(icon + ':   '); // Aumentado el espacio después de los dos puntos

        if (doc.getTextWidth(value) > maxWidth) {
            const words = value.split(' ');
            let line = '';
            let firstLine = true;

            words.forEach(word => {
                const testLine = line + (line ? ' ' : '') + word;
                if (doc.getTextWidth(testLine) < maxWidth) {
                    line = testLine;
                } else {
                    doc.text(line, firstLine ? margin + iconWidth : margin + 4, currentY);
                    currentY += lineSpacing;
                    line = word;
                    firstLine = false;
                }
            });

            if (line) {
                doc.text(line, firstLine ? margin + iconWidth : margin + 4, currentY);
                currentY += lineSpacing;
            }
        } else {
            doc.text(value, margin + iconWidth, currentY);
            currentY += lineSpacing;
        }
    };

    // Información de contacto con dos puntos añadidos a las letras
    if (cardData.phone) addContactItem('T', cardData.phone);
    if (cardData.mobile) addContactItem('M', cardData.mobile);
    if (cardData.email) addContactItem('E', cardData.email);
    if (cardData.website) addContactItem('W', cardData.website);
    if (cardData.address) addContactItem('A', cardData.address);
    if (cardData.city || cardData.postalCode) {
        const location = [cardData.city, cardData.postalCode].filter(Boolean).join(', ');
        addContactItem('L', location);
    }

    doc.save(`${cardData.name.replace(/\s+/g, '-')}-business-card.pdf`);
};

export const shareViaWhatsApp = (message: string): void => {
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
    }
};

export const shareGeneric = async (cardData: CardData): Promise<boolean> => {
    if (!navigator.share) {
        return false;
    }

    const contactInfo = `
📇 ${cardData.name}'s Business Card

👤 Contact Information:
${cardData.title ? `📋 Title: ${cardData.title}\n` : ''}${cardData.company ? `🏢 Company: ${cardData.company}\n` : ''}${cardData.phone ? `📞 Phone: ${cardData.phone}\n` : ''}${cardData.mobile ? `📱 Mobile: ${cardData.mobile}\n` : ''}${cardData.email ? `📧 Email: ${cardData.email}\n` : ''}${cardData.website ? `🌐 Website: ${cardData.website}\n` : ''}

${(cardData.address || cardData.city || cardData.postalCode) ? `📍 Location:\n${cardData.address ? `${cardData.address}\n` : ''}${[cardData.city, cardData.postalCode].filter(Boolean).join(', ')}` : ''}

--
This business card was created using Business Card Generator`.trim();

    try {
        await navigator.share({
            title: `${cardData.name}'s Business Card`,
            text: contactInfo
        });
        return true;
    } catch (err) {
        console.error('Error sharing: ', err);
        return false;
    }
};

export const generateImage = async (cardData: CardData): Promise<void> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    // Dimensiones base (tamaños reales de una tarjeta de presentación)
    const baseWidth = cardData.orientation === 'horizontal' ? 1000 : 600;
    const baseHeight = cardData.orientation === 'horizontal' ? 600 : 1000;
    const spacing = 40;

    // Configurar canvas
    canvas.width = cardData.orientation === 'horizontal'
        ? baseWidth * 2 + spacing
        : baseWidth;
    canvas.height = cardData.orientation === 'horizontal'
        ? baseHeight
        : baseHeight * 2 + spacing;

    // Habilitar suavizado
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const drawCardSide = async (x: number, y: number, isFront: boolean) => {
        const width = baseWidth;
        const height = baseHeight;
        const radius = 20;

        // Sombra
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;

        // Fondo con bordes redondeados
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x + radius, y, x + radius, y);
        ctx.closePath();
        ctx.clip();

        // Gradiente
        const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
        if (isFront) {
            gradient.addColorStop(0, cardData.secondaryColor);
            gradient.addColorStop(1, cardData.secondaryColor);
        } else {
            gradient.addColorStop(0, cardData.primaryColor);
            gradient.addColorStop(1, cardData.primaryColor);
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, height);

        if (isFront) {
            // Logo
            if (cardData.logo) {
                try {
                    const img = new Image();
                    img.src = cardData.logo;
                    await new Promise((resolve) => {
                        img.onload = resolve;
                    });
                    const logoSize = cardData.orientation === 'horizontal'
                        ? height * 0.4
                        : width * 0.4;
                    const logoX = x + (width - logoSize) / 2;
                    const logoY = y + height * 0.1;
                    ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
                } catch (error) {
                    console.error('Error adding logo:', error);
                }
            }

            // Texto frontal
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.textAlign = 'center';
            ctx.fillStyle = cardData.primaryColor;
            const startY = y + (cardData.logo ? height * 0.6 : height * 0.4);
            const centerX = x + width / 2;

            // Nombre
            const nameSize = cardData.orientation === 'horizontal'
                ? height * 0.12
                : width * 0.12;
            ctx.font = `bold ${nameSize}px ${cardData.fontFamily}`;
            ctx.fillText(cardData.name, centerX, startY);

            // Título
            if (cardData.title) {
                const titleSize = nameSize * 0.5;
                ctx.font = `${titleSize}px ${cardData.fontFamily}`;
                ctx.fillText(cardData.title, centerX, startY + nameSize);
            }

            // Empresa
            if (cardData.company) {
                const companySize = nameSize * 0.4;
                ctx.font = `${companySize}px ${cardData.fontFamily}`;
                ctx.fillText(cardData.company.toUpperCase(), centerX, startY + nameSize * 1.6);
            }
        } else {
            // Contenido trasero
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.fillStyle = cardData.textColor;
            const margin = width * 0.1;
            let currentY = y + height * 0.15;
            const fontSize = cardData.orientation === 'horizontal'
                ? height * 0.06
                : width * 0.06;
            const lineHeight = fontSize * 1.5;

            // Información de contacto
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';

            const addContactItem = (icon: string, value: string) => {
                ctx.font = `bold ${fontSize}px ${cardData.fontFamily}`;
                ctx.fillText(icon, margin, currentY);

                const iconWidth = ctx.measureText(`${icon} `).width;
                ctx.font = `${fontSize}px ${cardData.fontFamily}`;
                ctx.fillText(value, margin + iconWidth, currentY);

                currentY += lineHeight;
            };

            if (cardData.phone) addContactItem('T', cardData.phone);
            if (cardData.mobile) addContactItem('M', cardData.mobile);
            if (cardData.email) addContactItem('E', cardData.email);
            if (cardData.website) addContactItem('W', cardData.website);
            if (cardData.address) addContactItem('A', cardData.address);
            if (cardData.city || cardData.postalCode) {
                const location = [cardData.city, cardData.postalCode].filter(Boolean).join(', ');
                addContactItem('L', location);
            }

            // QR Code
            if (cardData.phone) {
                try {
                    const qrSize = cardData.orientation === 'horizontal'
                        ? height * 0.5
                        : width * 0.4;
                    const qrX = x + (cardData.orientation === 'horizontal'
                        ? width * 0.6
                        : (width - qrSize) / 2);
                    const qrY = y + (cardData.orientation === 'horizontal'
                        ? (height - qrSize) / 2
                        : height * 0.6);

                    // Fondo blanco para QR
                    ctx.fillStyle = '#FFFFFF';
                    const padding = 20;
                    ctx.fillRect(qrX - padding, qrY - padding, qrSize + padding * 2, qrSize + padding * 2);

                    const qrDataUrl = await QRCode.toDataURL(`tel:${cardData.phone}`, {
                        width: qrSize,
                        margin: 0,
                        color: {
                            dark: cardData.textColor,
                            light: '#FFFFFF'
                        }
                    });

                    const qrImg = new Image();
                    qrImg.src = qrDataUrl;
                    await new Promise((resolve) => {
                        qrImg.onload = resolve;
                    });
                    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
                } catch (error) {
                    console.error('Error adding QR code:', error);
                }
            }
        }
        ctx.restore();
    };

    // Fondo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar tarjetas
    if (cardData.orientation === 'horizontal') {
        await drawCardSide(0, 0, true);
        await drawCardSide(baseWidth + spacing, 0, false);
    } else {
        await drawCardSide(0, 0, true);
        await drawCardSide(0, baseHeight + spacing, false);
    }

    // Guardar imagen
    const link = document.createElement('a');
    link.download = `${cardData.name.replace(/\s+/g, '-')}-business-card.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 1.0);
    link.click();
}; 