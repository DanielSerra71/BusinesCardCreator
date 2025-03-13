export interface CardData {
    name: string;
    title?: string;
    company?: string;
    phone?: string;
    mobile?: string;
    email?: string;
    website?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    logo?: string;
    // New customization options
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    fontFamily: string;
    orientation: 'horizontal' | 'vertical';
}

export interface ThemeOption {
    label: string;
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
}

export const FONT_OPTIONS = [
    { label: 'Poppins', value: 'Poppins, sans-serif' },
    { label: 'Roboto', value: 'Roboto, sans-serif' },
    { label: 'Playfair Display', value: 'Playfair Display, serif' },
    { label: 'Montserrat', value: 'Montserrat, sans-serif' },
    { label: 'Open Sans', value: 'Open Sans, sans-serif' }
];

export const COLOR_THEMES: ThemeOption[] = [
    {
        label: 'Classic Brown',
        primaryColor: '#8B5A2B',
        secondaryColor: '#D9BBA9',
        textColor: '#FFFFFF'
    },
    {
        label: 'Modern Blue',
        primaryColor: '#1E3D59',
        secondaryColor: '#B5D6E6',
        textColor: '#FFFFFF'
    },
    {
        label: 'Elegant Green',
        primaryColor: '#2C5530',
        secondaryColor: '#C2D6B4',
        textColor: '#FFFFFF'
    },
    {
        label: 'Professional Gray',
        primaryColor: '#2C3E50',
        secondaryColor: '#ECF0F1',
        textColor: '#FFFFFF'
    },
    {
        label: 'Creative Purple',
        primaryColor: '#5B3256',
        secondaryColor: '#E7C7E5',
        textColor: '#FFFFFF'
    }
]; 