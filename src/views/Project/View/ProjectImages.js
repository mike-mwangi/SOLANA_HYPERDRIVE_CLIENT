import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, CardMedia, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import Avatar from 'ui-component/extended/Avatar';

// third-party
import useConfig from 'hooks/useConfig';
import Lightbox from 'react-18-image-lightbox';
import Slider from 'react-slick';
import DefaultProjectImage from 'assets/images/DefaultProjectImage.jpg';

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProjectImages = ({ images }) => {
    const theme = useTheme();
    const { borderRadius } = useConfig();
    console.log(images);
    const matchDownLG = useMediaQuery(theme.breakpoints.up('lg'));
    const initialImage = images?.[0] || '';

    const [selected, setSelected] = useState(initialImage);
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const lgNo = matchDownLG ? 4 : 3;

    const settings = {
        dots: false,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '0px',
        slidesToShow: images?.length > 3 ? lgNo : images?.length
    };
    const mediaSX = {
        width: '100%',
        borderRadius: '12px'
    };
    if (!images) {
        return <CardMedia component="img" image={DefaultProjectImage} title="image" sx={mediaSX} />;
    }
    return (
        <>
            <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                <Grid item xs={12}>
                    <MainCard content={false} sx={{ m: '0 auto' }}>
                        <CardMedia
                            onClick={() => {
                                setModal(!modal);
                                setIsOpen(true);
                            }}
                            component="img"
                            image={selected.url}
                            sx={{ borderRadius: `${borderRadius}px`, overflow: 'hidden', cursor: 'zoom-in' }}
                        />
                    </MainCard>
                </Grid>
                <Grid item xs={11} sm={7} md={9} lg={10} xl={8}>
                    <Slider {...settings}>
                        {images.map((item, index) => (
                            <Box
                                key={index}
                                onClick={() => {
                                    setSelected(item);
                                    setPhotoIndex(index);
                                }}
                                sx={{ p: 1 }}
                            >
                                <Avatar
                                    outline={selected === item}
                                    size={matchDownLG ? 'lg' : 'md'}
                                    color="primary"
                                    src={item.url}
                                    variant="rounded"
                                    sx={{ m: '0 auto', cursor: 'pointer' }}
                                />
                            </Box>
                        ))}
                    </Slider>
                </Grid>
            </Grid>
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex].url}
                    nextSrc={images[(photoIndex + 1) % images.length].url}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                />
            )}
        </>
    );
};

ProjectImages.propTypes = {
    images: PropTypes.array
};

export default ProjectImages;
