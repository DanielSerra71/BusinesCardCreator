import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
    phone: string;
    size?: number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ phone, size = 100 }) => {
    const phoneUrl = `tel:${phone.replace(/\D/g, '')}`;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <QRCodeSVG
                value={phoneUrl}
                size={size}
                level="H"
                includeMargin={true}
                style={{ padding: '10px', background: 'white', borderRadius: '5px' }}
            />
        </div>
    );
};

export default QRCodeGenerator; 