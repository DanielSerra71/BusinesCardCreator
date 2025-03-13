import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BusinessCard from '../components/BusinessCard';
import ShareButtons from '../components/ShareButtons';
import { motion } from 'framer-motion';
import { CardData } from '../utils/types';
import Logo from '../components/Logo';
import { getCardById } from '../utils/cardStorage';

const CardPreviewScreen: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cardData, setCardData] = useState<CardData | null>(null);

    useEffect(() => {
        if (id) {
            const savedCard = getCardById(id);
            if (savedCard) {
                setCardData(savedCard);
            }
        }
    }, [id]);

    const containerStyle = {
        minHeight: '100vh',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '30px',
        fontFamily: 'Poppins, sans-serif',
    };

    const headerContainerStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        position: 'relative' as const,
        width: '100%',
        maxWidth: '800px',
    };

    const backButtonStyle = {
        position: 'absolute' as const,
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '50px',
        background: 'rgba(255, 255, 255, 0.2)',
        color: '#FFFFFF',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
    };

    const contentStyle = {
        maxWidth: '800px',
        width: '100%',
        padding: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '20px',
    };

    const buttonStyle = {
        padding: '15px 30px',
        border: 'none',
        borderRadius: '50px',
        background: 'rgba(255, 255, 255, 0.9)',
        color: '#1a2a6c',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        fontFamily: 'Poppins, sans-serif',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        minWidth: '200px',
    };

    const titleStyle = {
        color: '#FFFFFF',
        fontSize: '2em',
        textAlign: 'center' as const,
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    };

    if (!cardData) {
        return (
            <div style={containerStyle}>
                <div style={headerContainerStyle}>
                    <Logo size={80} color="#FFFFFF" />
                    <motion.button
                        style={backButtonStyle}
                        whileHover={{
                            scale: 1.05,
                            background: 'rgba(255, 255, 255, 0.3)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/cards')}
                    >
                        <i className="fas fa-arrow-left" /> Back to Cards
                    </motion.button>
                </div>
                <div style={contentStyle}>
                    <h2 style={titleStyle}>Card not found</h2>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={headerContainerStyle}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Logo size={80} color="#FFFFFF" />
                </motion.div>
                <motion.button
                    style={backButtonStyle}
                    whileHover={{
                        scale: 1.05,
                        background: 'rgba(255, 255, 255, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/cards')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <i className="fas fa-arrow-left" /> Back to Cards
                </motion.button>
            </div>

            <motion.div
                style={contentStyle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h2 style={titleStyle}>Your Business Card</h2>
                <div style={{ marginBottom: '20px' }}>
                    <BusinessCard cardData={cardData} />
                </div>
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <ShareButtons cardData={cardData} />
                </div>
                <motion.button
                    style={buttonStyle}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/admin/${id}`)}
                >
                    Edit Card
                </motion.button>
            </motion.div>
        </div>
    );
};

export default CardPreviewScreen; 