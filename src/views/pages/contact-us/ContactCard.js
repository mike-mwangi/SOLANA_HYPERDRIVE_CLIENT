import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, Container, FormControl, Grid, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

const ContactCard = () => {
    const theme = useTheme();

    return (
        <Container>
            <Grid container justifyContent="center" spacing={gridSpacing}>
                <Grid item sm={10} md={7} sx={{ mt: { md: 12.5, xs: 2.5 }, mb: { md: 12.5, xs: 2.5 } }}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h1"
                                color="white"
                                component="div"
                                sx={{
                                    fontSize: '3.5rem',
                                    fontWeight: 900,
                                    lineHeight: 1.4,
                                    [theme.breakpoints.down('md')]: { fontSize: '1.8125rem', marginTop: '80px' }
                                }}
                            >
                                Contact Us
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{ fontWeight: 400, lineHeight: 1.4, [theme.breakpoints.up('md')]: { my: 0, mx: 12.5 } }}
                                color="white"
                            >
                                We&apos;re here to help and answer any questions you might have. For direct inquiries, please email us at{' '}
                                <a href="mailto:carbonmarketsledger@gmail.com" style={{ color: 'black' }}>
                                    carbonmarketsledger@gmail.com
                                </a>
                                .{' '}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* <Grid item xs={10} sx={{ mb: -37.5 }}>
                    <Card sx={{ mb: 6.25 }} elevation={4}>
                        <CardContent sx={{ p: 4 }}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Name</InputLabel>
                                        <OutlinedInput type="text" label="Name" />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Email Address</InputLabel>
                                        <OutlinedInput type="text" label="Email Address" />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-multiline-static1"
                                            placeholder="Message"
                                            multiline
                                            fullWidth
                                            rows={4}
                                            defaultValue=""
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item sm zeroMinWidth>
                                            <Typography align="left" variant="body2">
                                                By submitting this, you agree to the
                                                <Typography variant="subtitle1" component={Link} to="#" color="primary" sx={{ mx: 0.5 }}>
                                                    Privacy Policy
                                                </Typography>
                                                and
                                                <Typography variant="subtitle1" component={Link} to="#" color="primary" sx={{ ml: 0.5 }}>
                                                    Cookie Policy
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <AnimateButton>
                                                <Button variant="contained" color="secondary">
                                                    Submit
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid> */}
            </Grid>
        </Container>
    );
};

export default ContactCard;
