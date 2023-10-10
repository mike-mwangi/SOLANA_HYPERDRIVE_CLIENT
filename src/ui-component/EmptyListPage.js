// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CardMedia, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// assets
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import empty from 'assets/images/empty.svg';

// ==============================|| NO/EMPTY Product ||============================== //

const ProductEmpty = ({ header, body, link, callToAction, image }) => {
    const theme = useTheme();
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Box sx={{ maxWidth: 720, m: '0 auto', textAlign: 'center' }}>
                    <Grid container justifyContent="center" spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <CardMedia component="img" image={image || empty} title="Slider5 image" />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Typography variant="h1" color="inherit" component="div">
                                        {header}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">{body}</Typography>
                                </Grid>
                                {link && callToAction && (
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" href={link}>
                                            {callToAction}
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProductEmpty;
