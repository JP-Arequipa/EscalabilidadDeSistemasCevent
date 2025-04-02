import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';

const SkeletonEventsBox = () => {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {[1, 2, 3].map((value) => (
          <Grid key={value} size={{ xs: 12, sm: 4, md: 4 }}>
            <Skeleton
              sx={{ backgroundColor: '#f2f2f2' }}
              variant="rectangular"
              width="100%"
              height={100}
            />
            <Skeleton
              sx={{ backgroundColor: '#f2f2f2' }}
              variant="text"
              width="80%"
              height={35}
            />
            <Skeleton
              sx={{ backgroundColor: '#f2f2f2' }}
              variant="rectangular"
              width="100%"
              height={50}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkeletonEventsBox;
