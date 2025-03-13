import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QRCodeGenerator from './QRCodeGenerator';
import { CardData } from '../utils/types';

interface BusinessCardProps {
    cardData: CardData;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ cardData }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const getCardDimensions = () => {
        return cardData.orientation === 'horizontal'
            ? { width: '300px', height: '180px' }
            : { width: '180px', height: '300px' };
    };

    const getFontSizes = () => {
        const isLongEmail = (cardData.email?.length ?? 0) > 25;
        const isLongName = cardData.name.length > 20;
        const isLongTitle = (cardData.title?.length ?? 0) > 25;
        const isLongCompany = (cardData.company?.length ?? 0) > 25;

        if (cardData.orientation === 'horizontal') {
            return {
                name: isLongName ? '20px' : '24px',
                title: isLongTitle ? '12px' : '13px',
                company: isLongCompany ? '10px' : '11px',
                contact: '14px',
                email: isLongEmail ? '10px' : '12px',
            };
        } else {
            return {
                name: isLongName ? '16px' : '20px',
                title: isLongTitle ? '10px' : '11px',
                company: isLongCompany ? '9px' : '10px',
                contact: '12px',
                email: '11px',
            };
        }
    };

    const getLogoSize = () => {
        return cardData.orientation === 'horizontal'
            ? { width: '50px', height: '50px' }
            : { width: '55px', height: '55px' };
    };

    const getPadding = () => {
        return cardData.orientation === 'horizontal'
            ? '15px'
            : '12px';
    };

    const getQRSize = (): number => {
        if (cardData.orientation === 'horizontal') {
            return 65;
        }
        return 70;
    };

    const cardStyle = {
        ...getCardDimensions(),
        position: 'relative' as const,
        cursor: 'pointer',
        transformStyle: 'preserve-3d' as const,
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        fontFamily: cardData.fontFamily,
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.6s',
        ':hover': {
            boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
        },
    };

    const faceStyle = {
        position: 'absolute' as const,
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden' as const,
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        padding: getPadding(),
        boxSizing: 'border-box' as const,
        borderRadius: '15px',
        fontFamily: 'inherit',
        background: `linear-gradient(135deg, ${cardData.secondaryColor}ee, ${cardData.secondaryColor})`,
    };

    const frontStyle = {
        ...faceStyle,
        color: cardData.primaryColor,
    };

    const backStyle = {
        ...faceStyle,
        background: `linear-gradient(135deg, ${cardData.primaryColor}ee, ${cardData.primaryColor})`,
        color: cardData.textColor,
        transform: 'rotateY(180deg)',
    };

    const contentStyle = {
        textAlign: 'center' as const,
        width: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: cardData.orientation === 'horizontal' ? '6px' : '3px',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '0 10px',
        boxSizing: 'border-box' as const,
    };

    const nameStyle = {
        margin: 0,
        fontSize: getFontSizes().name,
        fontWeight: 600,
        lineHeight: 1.2,
        fontFamily: 'inherit',
        letterSpacing: '0.5px',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: cardData.orientation === 'horizontal' ? 'nowrap' as const : 'normal' as const,
        display: cardData.orientation === 'horizontal' ? 'block' : '-webkit-box',
        WebkitLineClamp: cardData.orientation === 'horizontal' ? undefined : 2,
        WebkitBoxOrient: cardData.orientation === 'horizontal' ? undefined : 'vertical' as const,
        maxHeight: cardData.orientation === 'horizontal' ? undefined : '2.4em',
        marginBottom: cardData.orientation === 'horizontal' ? 0 : '2px',
    };

    const titleStyle = {
        margin: 0,
        fontSize: getFontSizes().title,
        fontWeight: 400,
        lineHeight: 1.2,
        fontFamily: 'inherit',
        letterSpacing: '0.3px',
        opacity: 0.8,
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const,
    };

    const companyStyle = {
        margin: 0,
        fontSize: getFontSizes().company,
        fontWeight: 400,
        lineHeight: 1.2,
        fontFamily: 'inherit',
        letterSpacing: '0.3px',
        textTransform: 'uppercase' as const,
        opacity: 0.75,
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const,
    };

    const backContentStyle = {
        textAlign: 'center' as const,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: cardData.orientation === 'horizontal' ? 'row' as const : 'column' as const,
        alignItems: 'center',
        justifyContent: cardData.orientation === 'horizontal' ? 'space-between' : 'flex-start',
        overflow: 'hidden',
        boxSizing: 'border-box' as const,
        padding: cardData.orientation === 'horizontal' ? '8px' : '5px',
    };

    const contactInfoStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: cardData.orientation === 'horizontal' ? '3px' : '1px',
        width: cardData.orientation === 'horizontal' ? '65%' : '100%',
        padding: cardData.orientation === 'horizontal' ? '0 0 0 8px' : '0',
        alignItems: cardData.orientation === 'horizontal' ? 'flex-start' : 'center',
        justifyContent: 'center',
        height: '100%',
        overflow: 'hidden',
    };

    const contactGroupStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1px',
        width: cardData.orientation === 'horizontal' ? '100%' : '80%',
        alignItems: cardData.orientation === 'horizontal' ? 'flex-start' : 'center',
    };

    const contactItemStyle = {
        margin: 0,
        fontSize: cardData.orientation === 'horizontal' ? '9px' : '8px',
        fontWeight: 500,
        lineHeight: 1.1,
        fontFamily: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '4px',
        opacity: 0.9,
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal' as const,
        padding: '0',
        flexDirection: 'row' as const,
        textAlign: 'left' as const,
        minHeight: cardData.orientation === 'horizontal' ? '14px' : '16px',
    };

    const emailItemStyle = {
        ...contactItemStyle,
        fontSize: cardData.orientation === 'horizontal' ? '9px' : '8px',
    };

    const iconStyle = {
        fontSize: cardData.orientation === 'horizontal' ? '10px' : '9px',
        flexShrink: 0,
        width: '10px',
        textAlign: 'center' as const,
    };

    const dividerStyle = {
        width: cardData.orientation === 'horizontal' ? '95%' : '100%',
        height: '1px',
        background: `linear-gradient(to right, ${cardData.textColor}33, ${cardData.textColor}22, transparent)`,
        margin: '1px 0',
        alignSelf: cardData.orientation === 'horizontal' ? 'flex-start' : 'stretch',
    };

    const logoContainerStyle = {
        marginBottom: cardData.orientation === 'horizontal' ? '10px' : '12px',
        padding: cardData.orientation === 'horizontal' ? '4px' : '5px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const qrContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: cardData.orientation === 'horizontal' ? '35%' : '100%',
        padding: cardData.orientation === 'horizontal'
            ? '0 8px 0 0'
            : '3px 0 5px 0',
    };

    return (
        <motion.div
            style={cardStyle}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => setIsFlipped(!isFlipped)}
            whileHover={{ scale: 1.02 }}
        >
            <div style={frontStyle}>
                <div style={contentStyle}>
                    {cardData.logo && (
                        <div style={logoContainerStyle}>
                            <img
                                src={cardData.logo}
                                alt="Company Logo"
                                style={{
                                    ...getLogoSize(),
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                    )}
                    <h2 style={nameStyle}>{cardData.name}</h2>
                    <p style={titleStyle}>{cardData.title}</p>
                    <p style={companyStyle}>{cardData.company}</p>
                </div>
            </div>

            <div style={backStyle}>
                <div style={backContentStyle}>
                    {cardData.orientation === 'vertical' && (
                        <div style={qrContainerStyle}>
                            <QRCodeGenerator
                                phone={cardData.phone || ''}
                                size={getQRSize()}
                            />
                        </div>
                    )}
                    <div style={contactInfoStyle}>
                        {(cardData.phone || cardData.mobile) && (
                            <>
                                <div style={contactGroupStyle}>
                                    {cardData.phone && (
                                        <div style={contactItemStyle}>
                                            <i className="fas fa-phone" style={iconStyle} />
                                            <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>{cardData.phone}</span>
                                        </div>
                                    )}
                                    {cardData.mobile && (
                                        <div style={contactItemStyle}>
                                            <i className="fas fa-mobile-alt" style={iconStyle} />
                                            <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>{cardData.mobile}</span>
                                        </div>
                                    )}
                                </div>
                                {(cardData.email || cardData.website) && <div style={dividerStyle} />}
                            </>
                        )}
                        {(cardData.email || cardData.website) && (
                            <>
                                <div style={contactGroupStyle}>
                                    {cardData.email && (
                                        <div style={emailItemStyle}>
                                            <i className="fas fa-envelope" style={iconStyle} />
                                            <span style={{
                                                letterSpacing: '0.2px',
                                                display: 'inline-block',
                                                width: '100%',
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: 'break-word',
                                                textAlign: 'left'
                                            }}>
                                                {(cardData.email?.length ?? 0) > (cardData.orientation === 'horizontal' ? 25 : 20)
                                                    ? cardData.email.replace(/@/, '@\n')
                                                    : cardData.email}
                                            </span>
                                        </div>
                                    )}
                                    {cardData.website && (
                                        <div style={contactItemStyle}>
                                            <i className="fas fa-globe" style={iconStyle} />
                                            <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>{cardData.website}</span>
                                        </div>
                                    )}
                                </div>
                                {(cardData.address || cardData.city || cardData.postalCode) && <div style={dividerStyle} />}
                            </>
                        )}
                        {(cardData.address || cardData.city || cardData.postalCode) && (
                            <div style={contactGroupStyle}>
                                {cardData.address && (
                                    <div style={contactItemStyle}>
                                        <i className="fas fa-map-marker-alt" style={iconStyle} />
                                        <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>{cardData.address}</span>
                                    </div>
                                )}
                                {(cardData.city || cardData.postalCode) && (
                                    <div style={contactItemStyle}>
                                        <i className="fas fa-map-pin" style={iconStyle} />
                                        <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                                            {[cardData.city, cardData.postalCode].filter(Boolean).join(', ')}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {cardData.orientation === 'horizontal' && (
                        <div style={qrContainerStyle}>
                            <QRCodeGenerator
                                phone={cardData.phone || ''}
                                size={getQRSize()}
                            />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default BusinessCard; 