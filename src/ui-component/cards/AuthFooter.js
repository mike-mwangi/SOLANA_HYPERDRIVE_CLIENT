// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="#" underline="hover">
            solana hyperdrive
        </Typography>
        <Typography variant="subtitle2" component={Link} href="#" underline="hover">
            &copy; carbonmarketsledger.com
        </Typography>
    </Stack>
);

export default AuthFooter;
