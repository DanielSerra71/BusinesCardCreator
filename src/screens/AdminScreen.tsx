import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import CardCustomizer from '../components/CardCustomizer';
import { CardData } from '../utils/types';
import Logo from '../components/Logo';
import { getCardById, saveCard, updateCard } from '../utils/cardStorage';

const AdminScreen: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [logo, setLogo] = useState<string>('');
    const [cardData, setCardData] = useState<CardData>({
        name: '',
        phone: '',
        primaryColor: '#8B5A2B',
        secondaryColor: '#D9BBA9',
        textColor: '#FFFFFF',
        fontFamily: 'Poppins, sans-serif',
        orientation: 'horizontal'
    });

    useEffect(() => {
        if (id) {
            const savedCard = getCardById(id);
            if (savedCard) {
                setCardData({
                    ...savedCard,
                    primaryColor: savedCard.primaryColor || '#8B5A2B',
                    secondaryColor: savedCard.secondaryColor || '#D9BBA9',
                    textColor: savedCard.textColor || '#FFFFFF',
                    fontFamily: savedCard.fontFamily || 'Poppins, sans-serif',
                    orientation: savedCard.orientation || 'horizontal'
                });
                if (savedCard.logo) {
                    setLogo(savedCard.logo);
                }
            }
        }
    }, [id]);

    const containerStyle = {
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
        fontFamily: 'Poppins, sans-serif',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
    };

    const headerContainerStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        position: 'relative' as const,
        width: '100%',
        maxWidth: '800px',
        marginBottom: '10px',
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

    const formStyle = {
        maxWidth: '800px',
        width: '100%',
        margin: '10px auto',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
    };

    const headerStyle = {
        textAlign: 'center' as const,
        marginBottom: '15px',
        color: '#FFFFFF',
    };

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '15px',
        '@media (min-width: 1024px)': {
            gridTemplateColumns: '1fr 1fr',
        },
    };

    const sectionStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '15px',
        borderRadius: '15px',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px',
    };

    const inputContainerStyle = {
        marginBottom: '8px',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        margin: '2px 0',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        fontSize: '13px',
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#FFFFFF',
        transition: 'all 0.3s ease',
    };

    const labelStyle = {
        color: '#FFFFFF',
        fontSize: '12px',
        marginBottom: '2px',
        display: 'block',
    };

    const buttonStyle = {
        padding: '12px 25px',
        margin: '15px 0 0 0',
        border: 'none',
        borderRadius: '50px',
        background: 'rgba(255, 255, 255, 0.9)',
        color: '#1a2a6c',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: '500',
        width: '100%',
        fontFamily: 'Poppins, sans-serif',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCustomizationUpdate = (updates: Partial<CardData>) => {
        setCardData(prev => ({ ...prev, ...updates }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalCardData = {
            ...cardData,
            logo,
            phone: cardData.phone || ''  // Ensure phone is at least an empty string
        };

        if (id) {
            updateCard(id, finalCardData);
            navigate(`/preview/${id}`);
        } else {
            const newCard = saveCard(finalCardData);
            navigate(`/preview/${newCard.id}`);
        }
    };

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
                    onClick={() => navigate('/')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <i className="fas fa-arrow-left" /> Back
                </motion.button>
            </div>

            <motion.form
                style={formStyle}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div style={headerStyle}>
                    <h2 style={{ fontSize: '20px', margin: '0 0 10px 0' }}>Create Your Business Card</h2>
                </div>

                <div style={gridContainerStyle}>
                    <div style={sectionStyle}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#FFFFFF', fontSize: '16px' }}>Card Information</h3>
                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={cardData.name}
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={cardData.title}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Company</label>
                            <input
                                type="text"
                                name="company"
                                value={cardData.company}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={cardData.phone}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Mobile</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={cardData.mobile}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={cardData.email}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Website</label>
                            <input
                                type="url"
                                name="website"
                                value={cardData.website}
                                onChange={handleInputChange}
                                style={inputStyle}
                                placeholder="https://example.com"
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={cardData.address}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>City</label>
                            <input
                                type="text"
                                name="city"
                                value={cardData.city}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Postal Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={cardData.postalCode}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Logo (optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoChange}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <div style={sectionStyle}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#FFFFFF', fontSize: '16px' }}>Card Customization</h3>
                        <CardCustomizer
                            cardData={cardData}
                            onUpdate={handleCustomizationUpdate}
                        />
                    </div>
                </div>

                <motion.button
                    type="submit"
                    style={buttonStyle}
                    whileHover={{
                        scale: 1.02,
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    Save and Preview
                </motion.button>
            </motion.form>
        </div>
    );
};

export default AdminScreen; 