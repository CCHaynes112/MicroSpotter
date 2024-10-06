import { useState, useEffect } from 'react';
import {
    Box, Typography, Card, CardContent, CardMedia, Grid, LinearProgress,
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    IconButton, Input, ThemeProvider, createTheme
} from '@mui/material';
import { Close, Upload, CheckCircle } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1e40af', // Darker blue
        },
        secondary: {
            main: '#3b82f6', // Bright blue
        },
        background: {
            default: '#0c324b', // Very light blue
        },
        text: {
            primary: '#1e3a8a', // Navy blue
            secondary: '#64748b', // Slate blue
        },
    },
});

interface Microorganism {
    name: string;
    image: string;
    description: string;
    habitat: string;
    size: string;
    funFact: string;
}

const microorganisms: Microorganism[] = [
    {
        name: "Amoeba",
        image: "https://via.placeholder.com/300x200?text=Amoeba",
        description: "Single-celled organism known for its ability to change shape.",
        habitat: "Freshwater",
        size: "250-750 µm",
        funFact: "Some species of amoeba can form a protective cyst when conditions are unfavorable."
    },
    {
        name: "Paramecium",
        image: "https://via.placeholder.com/300x200?text=Paramecium",
        description: "Ciliate protozoan with a distinctive slipper-like shape.",
        habitat: "Freshwater ponds and rivers",
        size: "50-350 µm",
        funFact: "Paramecia have a unique contractile vacuole that acts like a pump to expel excess water."
    },
    {
        name: "Euglena",
        image: "https://via.placeholder.com/300x200?text=Euglena",
        description: "Flagellate eukaryote with both plant-like and animal-like characteristics.",
        habitat: "Freshwater and moist soil",
        size: "15-500 µm",
        funFact: "Euglena have a light-sensitive eyespot that helps them detect and move towards light for photosynthesis."
    },
    {
        name: "Volvox",
        image: "https://via.placeholder.com/300x200?text=Volvox",
        description: "Colonial algae that form hollow spherical colonies.",
        habitat: "Freshwater ponds and ditches",
        size: "500 µm - 1.5 mm",
        funFact: "Volvox colonies rotate as they move through water, resembling tiny green rolling balls."
    },
    {
        name: "Stentor",
        image: "https://via.placeholder.com/300x200?text=Stentor",
        description: "Large, trumpet-shaped ciliate protozoans known for their ability to change shape.",
        habitat: "Freshwater ponds and lakes",
        size: "500 µm - 2 mm",
        funFact: "Stentors can regenerate into a complete organism from just a small piece of themselves."
    },
    {
        name: "Diatom",
        image: "https://via.placeholder.com/300x200?text=Diatom",
        description: "Unicellular algae with cell walls made of silica.",
        habitat: "Aquatic environments, both freshwater and marine",
        size: "2 µm - 2 mm",
        funFact: "Diatoms are responsible for producing about 20% of the world's oxygen through photosynthesis."
    },
    {
        name: "Vorticella",
        image: "https://via.placeholder.com/300x200?text=Vorticella",
        description: "Bell-shaped ciliate protozoan attached to substrates by a long stalk.",
        habitat: "Freshwater ponds and streams",
        size: "30-100 µm",
        funFact: "Vorticella can contract its stalk into a spring-like coil in just 4 milliseconds."
    },
    {
        name: "Rotifer",
        image: "https://via.placeholder.com/300x200?text=Rotifer",
        description: "Microscopic animals with a corona of cilia used for locomotion and feeding.",
        habitat: "Freshwater environments",
        size: "50-2000 µm",
        funFact: "Some rotifers can survive extreme dehydration and remain dormant for years."
    },
    {
        name: "Tardigrade",
        image: "https://via.placeholder.com/300x200?text=Tardigrade",
        description: "Microscopic animals known for their extreme resilience.",
        habitat: "Various environments, including freshwater and terrestrial moss",
        size: "300-500 µm",
        funFact: "Tardigrades can survive extreme conditions, including the vacuum of space."
    },
    {
        name: "Hydra",
        image: "https://via.placeholder.com/300x200?text=Hydra",
        description: "Small, fresh-water organisms with a tubular body and tentacles.",
        habitat: "Freshwater ponds and lakes",
        size: "1-20 mm",
        funFact: "Hydra are known for their regenerative abilities and potential biological immortality."
    }
];

export default function Home() {
    const [selectedOrganism, setSelectedOrganism] = useState<Microorganism | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
    const [spottedCount, setSpottedCount] = useState(0);

    useEffect(() => {
        // Load uploaded images from local storage
        const storedImages = localStorage.getItem('uploadedImages');
        if (storedImages) {
            setUploadedImages(JSON.parse(storedImages));
        }
    }, []);

    useEffect(() => {
        const count = Object.keys(uploadedImages).length;
        setSpottedCount(count);
    }, [uploadedImages]);

    const handleCardClick = (organism: Microorganism) => {
        setSelectedOrganism(organism);
        setIsModalOpen(true);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && selectedOrganism) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result as string;
                setUploadedImages(prev => {
                    const newImages = {
                        ...prev,
                        [selectedOrganism.name]: result
                    };
                    // Save to local storage
                    localStorage.setItem('uploadedImages', JSON.stringify(newImages));
                    return newImages;
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveUpload = () => {
        if (selectedOrganism) {
            setUploadedImages(prev => {
                const newImages = { ...prev };
                delete newImages[selectedOrganism.name];
                // Update local storage
                localStorage.setItem('uploadedImages', JSON.stringify(newImages));
                return newImages;
            });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom, #bfdbfe, #f0f9ff)', // Light blue gradient
                py: 6,
                px: 2
            }}>
                <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
                    <Typography variant="h2" component="h1" sx={{ color: '#1e3a8a', mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
                        MicroSpotter
                    </Typography>
                    <Box sx={{ mb: 4, bgcolor: 'white', p: 2, borderRadius: 2, boxShadow: 1 }}>
                        <LinearProgress variant="determinate" value={(spottedCount / microorganisms.length) * 100} sx={{ height: 10, borderRadius: 5, backgroundColor: '#e2e8f0', '& .MuiLinearProgress-bar': { backgroundColor: '#3b82f6' } }} />
                        <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold', color: '#1e3a8a' }}>
                            Microorganisms Spotted: {spottedCount} / {microorganisms.length}
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {microorganisms.map((organism) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={organism.name}>
                                <Card
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05) rotate(1deg)',
                                            boxShadow: 3
                                        },
                                        position: 'relative',
                                        height: 280,
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        bgcolor: '#f0f9ff', // Very light blue
                                    }}
                                    onClick={() => handleCardClick(organism)}
                                >
                                    <Box sx={{
                                        height: 140,
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <CardMedia
                                            component="img"
                                            image={uploadedImages[organism.name] || organism.image}
                                            alt={organism.name}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
                                        <Typography variant="h6" component="h2" sx={{ color: '#1e3a8a', fontWeight: 'bold', mb: 0.5 }}>
                                            {organism.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>
                                            {organism.description}
                                        </Typography>
                                    </CardContent>
                                    {uploadedImages[organism.name] && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                bgcolor: '#3b82f6',
                                                color: 'white',
                                                borderRadius: '50%',
                                                p: 0.5,
                                                display: 'flex',
                                            }}
                                        >
                                            <CheckCircle />
                                        </Box>
                                    )}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Dialog
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    maxWidth="md"
                    fullWidth
                >
                    {selectedOrganism && (
                        <>
                            <DialogTitle sx={{ bgcolor: '#3b82f6', color: 'white', fontWeight: 'bold' }}>
                                {selectedOrganism.name}
                            </DialogTitle>
                            <DialogContent sx={{ bgcolor: '#f0f9ff', p: 0, display: 'flex', flexDirection: 'column', height: '80vh' }}>
                                <Box sx={{ position: 'relative', height: '60%', overflow: 'hidden' }}>
                                    <img
                                        src={uploadedImages[selectedOrganism.name] || selectedOrganism.image}
                                        alt={selectedOrganism.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            backgroundColor: '#e2e8f0'
                                        }}
                                    />
                                    {uploadedImages[selectedOrganism.name] && (
                                        <IconButton
                                            onClick={handleRemoveUpload}
                                            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255, 255, 255, 0.7)' }}
                                        >
                                            <Close />
                                        </IconButton>
                                    )}
                                </Box>
                                <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                                    <Typography variant="body1" sx={{ mb: 2, color: '#1e3a8a' }}>{selectedOrganism.description}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1, color: '#64748b' }}><strong>Habitat:</strong> {selectedOrganism.habitat}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1, color: '#64748b' }}><strong>Size:</strong> {selectedOrganism.size}</Typography>
                                    <Typography variant="body2" sx={{ mb: 1, color: '#64748b' }}><strong>Fun Fact:</strong> {selectedOrganism.funFact}</Typography>
                                    <Box sx={{ mt: 'auto' }}>
                                        <Input
                                            type="file"
                                            inputProps={{ accept: 'image/*' }}
                                            sx={{ display: 'none' }}
                                            id="file-upload"
                                            onChange={handleFileUpload}
                                        />
                                        <label htmlFor="file-upload">
                                            <Button
                                                variant="contained"
                                                component="span"
                                                startIcon={<Upload />}
                                                sx={{
                                                    bgcolor: '#3b82f6',
                                                    color: 'white',
                                                    '&:hover': {
                                                        bgcolor: '#2563eb',
                                                    },
                                                }}
                                            >
                                                {uploadedImages[selectedOrganism.name] ? 'Update Image' : 'Upload Image'}
                                            </Button>
                                        </label>
                                    </Box>
                                </Box>
                            </DialogContent>
                            <DialogActions sx={{ bgcolor: '#f0f9ff' }}>
                                <Button
                                    onClick={() => setIsModalOpen(false)}
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#1e40af',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: '#1e3a8a',
                                        },
                                    }}
                                >
                                    Close
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}