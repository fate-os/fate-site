import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prismaClient = new PrismaClient();

const updateQuote = async () => {
  try {
    const quoteParams = await prismaClient.$transaction([
      prismaClient.quote_parameter.create({ data: { straight_left: 'up', straight_right: 'up' } }), // 13
      prismaClient.quote_parameter.create({ data: { straight_left: 'down' } }), // 14
      prismaClient.quote_parameter.create({ data: { straight_left: 'up' } }), // 15
      prismaClient.quote_parameter.create({ data: { straight_left: 'up', has_circle: true } }), // 16
      prismaClient.quote_parameter.create({ data: { straight_left: 'down', has_circle: true } }), // 17
      prismaClient.quote_parameter.create({
        data: { straight_left: 'down', straight_right: 'down' },
      }), // 18
      prismaClient.quote_parameter.create({
        data: { straight_bottom: 'both_left_and_right' },
      }), // 19
      // prismaClient.quote_parameter.create({
      //   data: { top_number:56,left_side_number:8,bottom_left_number:20,bottom_right_number:32,right_side_number: },
      // }), // 20
    ]);

    const fateQuotes = await prismaClient.fate_quote.createMany({
      data: [
        // 13
        {
          date: moment.utc('2040-07-20 13:30:00').toDate(),
          gender: 'female',
          year_count: 1,
          quote_parameter_id: quoteParams[0].id,
        },
        // 14
        {
          date: moment.utc('1995-07-03 13:30:00').toDate(),
          gender: 'male',
          year_count: 1,
          quote_parameter_id: quoteParams[1].id,
        },
        // 15
        {
          date: moment.utc('1800-06-20 13:30:00').toDate(),
          gender: 'female',
          year_count: 1,
          quote_parameter_id: quoteParams[2].id,
        },
        // 16
        {
          date: moment.utc('2020-05-10 11:30:00').toDate(),
          gender: 'male',
          year_count: 1,
          quote_parameter_id: quoteParams[3].id,
        },
        // 17
        {
          date: moment.utc('2082-10-29 13:30:00').toDate(),
          gender: 'male',
          year_count: 1,
          quote_parameter_id: quoteParams[4].id,
        },
        // 18
        {
          date: moment.utc('1916-10-06 13:30:00').toDate(),
          gender: 'female',
          year_count: 1,
          quote_parameter_id: quoteParams[5].id,
        },
        // 19
        {
          date: moment.utc('2106-04-21 13:30:00').toDate(),
          gender: 'female',
          year_count: 1,
          quote_parameter_id: quoteParams[6].id,
        },
      ],
    });

    console.log('Fate quotes created:', fateQuotes.count);
  } catch (error) {
    console.error('Error seeding data:', error);
    throw new Error(error);
  } finally {
    await prismaClient.$disconnect();
  }
};

// updateQuote();
const updateQuoteParameter = async () => {
  const quoteParams = await prismaClient.fate_quote.findFirst({
    where: { date: moment.utc('1935-07-03 13:30:00').toDate(), gender: 'male', year_count: 1 },
  });
  // console.log(quoteParams, '--- quoteParams ---');
  const updateQuoteParam = await prismaClient.quote_parameter.update({
    where: { id: quoteParams.quote_parameter_id },
    data: { straight_left: 'down', straight_right: 'down' },
  });
  console.log(updateQuoteParam, '--- updateQuoteParam ---');
};

updateQuoteParameter();
