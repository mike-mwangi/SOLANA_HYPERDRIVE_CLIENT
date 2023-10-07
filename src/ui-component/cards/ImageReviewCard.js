// material-ui
import { ImageList, ImageListItem } from '@mui/material';

// project imports

// assets

// ==============================|| SOCIAL PROFILE - GALLERY CARD ||============================== //

const ImageReviewCard = ({ field }) => {
    if (Array.isArray(field) && field?.length > 0) {
        return (
            <ImageList variant="masonry" cols={3} gap={8}>
                {field.map((item) => {
                    // if item.url exists then just set source as that else set URL.createObjectURL(item)
                    const source = item?.url ? item.url : URL.createObjectURL(item);
                    return (
                        <ImageListItem>
                            <img
                                srcSet={`${source}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={item?.url ? `${source}?w=248&fit=crop&auto=format` : source}
                                alt={item?.name}
                                loading="lazy"
                            />
                        </ImageListItem>
                    );
                })}
            </ImageList>
        );
    }
    const source = field?.url ? field.url : URL.createObjectURL(field);
    return <img src={source} width="248px" alt={field?.name} loading="lazy" />;
};

export default ImageReviewCard;
