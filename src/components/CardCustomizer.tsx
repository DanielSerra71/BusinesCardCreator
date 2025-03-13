import React from 'react';
import { motion } from 'framer-motion';
import { COLOR_THEMES, FONT_OPTIONS, CardData } from '../utils/types';

interface CardCustomizerProps {
    cardData: CardData;
    onUpdate: (updates: Partial<CardData>) => void;
}

const CardCustomizer: React.FC<CardCustomizerProps> = ({ cardData, onUpdate }) => {
    const sectionStyle = {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        color: '#333',
        fontWeight: '500' as const,
    };

    const selectStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontFamily: 'inherit',
    };

    const colorButtonStyle = {
        width: '40px',
        height: '40px',
        margin: '5px',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'transform 0.2s',
    };

    return (
        <div>
            <div style={sectionStyle}>
                <h3 style={{ marginBottom: '15px' }}>Card Orientation</h3>
                <select
                    style={selectStyle}
                    value={cardData.orientation}
                    onChange={(e) => onUpdate({ orientation: e.target.value as 'horizontal' | 'vertical' })}
                >
                    <option value="horizontal">Horizontal</option>
                    <option value="vertical">Vertical</option>
                </select>
            </div>

            <div style={sectionStyle}>
                <h3 style={{ marginBottom: '15px' }}>Font Style</h3>
                <select
                    style={selectStyle}
                    value={cardData.fontFamily}
                    onChange={(e) => onUpdate({ fontFamily: e.target.value })}
                >
                    {FONT_OPTIONS.map((font) => (
                        <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                            {font.label}
                        </option>
                    ))}
                </select>
            </div>

            <div style={sectionStyle}>
                <h3 style={{ marginBottom: '15px' }}>Color Theme</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {COLOR_THEMES.map((theme) => (
                        <motion.button
                            key={theme.label}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                ...colorButtonStyle,
                                backgroundColor: theme.primaryColor,
                                border: cardData.primaryColor === theme.primaryColor ? '3px solid #000' : 'none',
                            }}
                            onClick={() => onUpdate({
                                primaryColor: theme.primaryColor,
                                secondaryColor: theme.secondaryColor,
                                textColor: theme.textColor,
                            })}
                            title={theme.label}
                        />
                    ))}
                </div>
            </div>

            <div style={sectionStyle}>
                <h3 style={{ marginBottom: '15px' }}>Custom Colors</h3>
                <div>
                    <label style={labelStyle}>Primary Color</label>
                    <input
                        type="color"
                        value={cardData.primaryColor}
                        onChange={(e) => onUpdate({ primaryColor: e.target.value })}
                        style={{ width: '100%', height: '40px' }}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <label style={labelStyle}>Secondary Color</label>
                    <input
                        type="color"
                        value={cardData.secondaryColor}
                        onChange={(e) => onUpdate({ secondaryColor: e.target.value })}
                        style={{ width: '100%', height: '40px' }}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <label style={labelStyle}>Text Color</label>
                    <input
                        type="color"
                        value={cardData.textColor}
                        onChange={(e) => onUpdate({ textColor: e.target.value })}
                        style={{ width: '100%', height: '40px' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardCustomizer; 