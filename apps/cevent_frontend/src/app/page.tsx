'use client';

import Layout from '@/components/Layout';
import { EventCategory } from '@/utils/interfaces/Categories';
import CategoryEventSection from '@/components/EventSection/CategoryEventSection';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ALL_CATEGORY_VALUE } from '@/utils/constans';
import BannerSection from '@/components/EventSection/BannerSection';
import { Box } from '@mui/material';

export default function Home() {
  const categories: EventCategory[] = useSelector(
    (state: RootState) => state.category,
  );

  return (
    <>
      <BannerSection />
      <Box sx={{ minHeight: '76vh' }}>
        <Layout>
          <CategoryEventSection category={ALL_CATEGORY_VALUE} />
          {categories &&
            categories.map((category) => {
              if (category.keyWord === ALL_CATEGORY_VALUE.keyWord) return null;
              return (
                <CategoryEventSection
                  key={category.keyWord}
                  category={category as EventCategory}
                />
              );
            })}
        </Layout>
      </Box>
    </>
  );
}
