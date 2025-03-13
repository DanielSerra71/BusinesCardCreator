import React from 'react';
import { motion } from 'framer-motion';
import { shareViaEmail, generatePDF, shareViaWhatsApp, copyToClipboard, shareGeneric } from '../utils/shareUtils';
import { CardData } from '../utils/types';

interface ShareButtonsProps {
    cardData: CardData;
}

const generateEmailContent = (cardData: CardData): string => {
    return `
📇 ${cardData.name}'s Business Card

👤 Contact Information:
${cardData.title ? `📋 Title: ${cardData.title}\n` : ''}${cardData.company ? `🏢 Company: ${cardData.company}\n` : ''}${cardData.phone ? `📞 Phone: ${cardData.phone}\n` : ''}${cardData.mobile ? `📱 Mobile: ${cardData.mobile}\n` : ''}${cardData.email ? `📧 Email: ${cardData.email}\n` : ''}${cardData.website ? `🌐 Website: ${cardData.website}\n` : ''}

${(cardData.address || cardData.city || cardData.postalCode) ? `📍 Location:\n${cardData.address ? `${cardData.address}\n` : ''}${[cardData.city, cardData.postalCode].filter(Boolean).join(', ')}` : ''}

--
This business card was created using Business Card Generator
    `.trim();
};

const generateWhatsAppContent = (cardData: CardData): string => {
    return `
📇 *${cardData.name}'s Business Card*

👤 *Contact Information:*
${cardData.title ? `📋 Title: ${cardData.title}\n` : ''}${cardData.company ? `🏢 Company: ${cardData.company}\n` : ''}${cardData.phone ? `📞 Phone: ${cardData.phone}\n` : ''}${cardData.mobile ? `📱 Mobile: ${cardData.mobile}\n` : ''}${cardData.email ? `📧 Email: ${cardData.email}\n` : ''}${cardData.website ? `🌐 Website: ${cardData.website}\n` : ''}

${(cardData.address || cardData.city || cardData.postalCode) ? `📍 *Location:*\n${cardData.address ? `${cardData.address}\n` : ''}${[cardData.city, cardData.postalCode].filter(Boolean).join(', ')}` : ''}
    `.trim();
};

const ShareButtons: React.FC<ShareButtonsProps> = ({ cardData }) => {
    const buttonContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '15px',
        width: '100%',
        padding: '10px',
    };

    const getButtonStyle = (color: string) => ({
        padding: '15px 25px',
        margin: '5px',
        border: 'none',
        borderRadius: '12px',
        background: `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -20)} 100%)`,
        color: '#FFFFFF',
        cursor: 'pointer',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase' as const,
        letterSpacing: '1px',
    });

    // Función para ajustar el color (oscurecer o aclarar)
    const adjustColor = (hex: string, percent: number) => {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        ).toString(16).slice(1);
    };

    const handleEmailShare = () => {
        const subject = 'Business Card';
        const body = generateEmailContent(cardData);
        shareViaEmail(subject, body);
    };

    const handleWhatsAppShare = () => {
        const message = generateWhatsAppContent(cardData);
        shareViaWhatsApp(message);
    };

    const handleCopyToClipboard = async () => {
        const text = `
📇 ${cardData.name}'s Business Card

👤 Contact Information:
${cardData.title ? `📋 Title: ${cardData.title}\n` : ''}${cardData.company ? `🏢 Company: ${cardData.company}\n` : ''}${cardData.phone ? `📞 Phone: ${cardData.phone}\n` : ''}${cardData.mobile ? `📱 Mobile: ${cardData.mobile}\n` : ''}${cardData.email ? `📧 Email: ${cardData.email}\n` : ''}${cardData.website ? `🌐 Website: ${cardData.website}\n` : ''}

${(cardData.address || cardData.city || cardData.postalCode) ? `📍 Location:\n${cardData.address ? `${cardData.address}\n` : ''}${[cardData.city, cardData.postalCode].filter(Boolean).join(', ')}` : ''}
        `.trim();
        const success = await copyToClipboard(text);
        if (success) {
            alert('Card details copied to clipboard!');
        } else {
            alert('Failed to copy to clipboard');
        }
    };

    return (
        <div style={buttonContainerStyle}>
            <motion.button
                style={getButtonStyle('#4A90E2')}
                whileHover={{
                    scale: 1.02,
                    boxShadow: '0 6px 20px rgba(74, 144, 226, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEmailShare}
            >
                <i className="far fa-envelope" /> Share via Email
            </motion.button>

            <motion.button
                style={getButtonStyle('#34C759')}
                whileHover={{
                    scale: 1.02,
                    boxShadow: '0 6px 20px rgba(52, 199, 89, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => generatePDF(cardData)}
            >
                <i className="far fa-file-pdf" /> Download PDF
            </motion.button>

            <motion.button
                style={getButtonStyle('#25D366')}
                whileHover={{
                    scale: 1.02,
                    boxShadow: '0 6px 20px rgba(37, 211, 102, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppShare}
            >
                <i className="fab fa-whatsapp" /> Share via WhatsApp
            </motion.button>

            <motion.button
                style={getButtonStyle('#FF9500')}
                whileHover={{
                    scale: 1.02,
                    boxShadow: '0 6px 20px rgba(255, 149, 0, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyToClipboard}
            >
                <i className="far fa-copy" /> Copy to Clipboard
            </motion.button>

            <motion.button
                style={getButtonStyle('#5856D6')}
                whileHover={{
                    scale: 1.02,
                    boxShadow: '0 6px 20px rgba(88, 86, 214, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => shareGeneric(cardData)}
            >
                <i className="fas fa-share-alt" /> Share...
            </motion.button>
        </div>
    );
};

export default ShareButtons; 