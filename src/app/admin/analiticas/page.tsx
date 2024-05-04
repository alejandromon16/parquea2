'use client'
import BarChart from '@/components/Barchart';
import RecentOrders from '@/components/RecentOrders';
import Top20Clients from '@/components/Top20Clients';
import Top20Ofertantes from '@/components/Top20Ofertantes';
import Top20WorstClients from '@/components/Top20WorstClients';
import Top20WorstOfertantes from '@/components/Top20WorstOfertantes';
import TopCards from '@/components/TopCards';
import { Box, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { motion } from 'framer-motion';
import PieChart from '@/components/PieChart';
import ParkingLotBubbleChart from '@/components/BubbleChrat';

const page = () => {
  const fadeIn = {
    initial: { opacity: 0 },
    animate: (custom: number) => ({
      opacity: 1,
      transition: { duration: 0.6, delay: custom * 0.3 }
    })
  };

  return (
    <Box flex={1} as={motion.div} initial="initial" custom={0} animate="animate" variants={fadeIn}>
      <HStack as={motion.div} variants={fadeIn} custom={0.5}>
        <TopCards />
      </HStack>

      <motion.div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4' variants={fadeIn} custom={2}>
        <BarChart />
        <RecentOrders />
      </motion.div>

      <motion.div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4' variants={fadeIn} custom={3.5}>
        <Top20Ofertantes />
        <Top20Clients />
        <Top20WorstOfertantes />
        <Top20WorstClients />
      </motion.div>

      <motion.div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4' variants={fadeIn} custom={4.5}>
        <PieChart />
        <ParkingLotBubbleChart />
      </motion.div>
    </Box>
  );
}

export default page;
