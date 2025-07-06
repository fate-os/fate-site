import { PrismaClient } from '@prisma/client';
import moment from 'moment';

// "prisma": {
//   "seed": "node prisma/seed.js"
// },


const prismaClient = new PrismaClient();

const seedQuote = async () => {
  try {
    // await prismaClient.fate_quote.deleteMany()
    // await prismaClient.quote_parameter.deleteMany()
    // First, create the quote parameters
    const quoteParam1 = await prismaClient.quote_parameter.create({
      data: {
        straight_left: 'up',
        straight_right: 'up',
      },
    });

    const quoteParam2 = await prismaClient.quote_parameter.create({
      data: {
        straight_left: 'up',
        straight_right: 'up',
      },
    });

    const quoteParam3 = await prismaClient.quote_parameter.create({
      data: {
        straight_left: 'up',
      },
    });

    const quoteParam4 = await prismaClient.quote_parameter.create({
      data: {
        straight_left: 'down',
        straight_right: 'down',
      },
    });

    const quoteParam5 = await prismaClient.quote_parameter.create({
      data: {
        top_number: 32,
        right_side_number: 44,
        bottom_right_number: 56,
        bottom_left_number: 8,
        left_side_number: 20,
        left_side_arrow:"up"
      },
    });

    const quoteParam6 = await prismaClient.quote_parameter.create({
      data: {
        straight_bottom:"both_left_and_right"
      },
    });
    const quoteParam7 = await prismaClient.quote_parameter.create({
      data: {
        shine: 'up',
      },
    });
    const quoteParam8 = await prismaClient.quote_parameter.create({
      data: {
        straight_left: 'down',
      },
    });

    // Then create the fate quotes with references to the quote parameters
    const fateQuotes = await prismaClient.fate_quote.createMany({
      data: [
        {
          date: moment.utc('1980-07-20 13:30:00').toDate(), // July 20, 1980 at 1:30 PM UTC
          gender: 'male',
          year_count: 1,
          quote_parameter_id: quoteParam1.id,
        },
        {
          date: moment.utc('1980-07-20 13:30:00').toDate(), // July 20, 1980 at 1:30 PM UTC
          gender: 'female',
          year_count: 1,
          quote_parameter_id: quoteParam2.id,
        },
        {
          date: moment.utc('1980-06-20 13:30:00').toDate(), // June 20, 1980 at 1:30 PM UTC
          gender: 'female',
          year_count: 1,
          quote_parameter_id: quoteParam3.id,
        },
        {
          date: moment.utc('1976-10-06 13:30:00').toDate(), // October 6, 1976 at 1:30 PM UTC
          gender: 'female',
          year_count: 1,
          quote_parameter_id: quoteParam4.id,
        },
        {
          date: moment.utc('1962-10-29 00:00:00').toDate(), // October 29, 1962 UTC
          gender: 'male',
          year_count: 60,
          quote_parameter_id: quoteParam5.id,
        },
        {
          date: moment.utc('1986-04-21 13:30:00').toDate(),
          gender: 'female',
          year_count: 1,
          quote_parameter_id: quoteParam6.id,
        },
        {
          date: moment.utc('1986-04-21 13:30:00').toDate(),
          gender: 'female',
          year_count: 60,
          quote_parameter_id: quoteParam7.id,
        },
        {
          date: moment.utc('1935-07-03 13:30:00').toDate(),
          gender: 'male',
          year_count: 1,
          quote_parameter_id: quoteParam8.id,
        },
      ],
    });

    console.log('Seed data created successfully');
  
    console.log('Fate quotes created:', fateQuotes.count);

  } catch (error) {
    console.error('Error seeding data:', error);
    throw new Error(error);
  } finally {
    await prismaClient.$disconnect();
  }
};

seedQuote();
