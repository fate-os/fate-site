import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prismaClient = new PrismaClient();

const updateQuote = async () => {
  try {
    // const findFirst = await prismaClient.fate_quote.findFirst({
    //   where: {
    //     date: moment.utc('2004-10-10 01:00:00').toDate(),
    //     gender: 'male',
    //     year_count: 60,
    //   },
    // });
    // const deleteQuote = await prismaClient.fate_quote.delete({
    //   where: {
    //     id: findFirst.id,
    //   },
    // });
    // const deleteParam = await prismaClient.quote_parameter.delete({
    //   where: {
    //     id: findFirst.quote_parameter_id,
    //   },
    // });

    // console.log(deleteParam, '--- deleteParam ---');
    // console.log(deleteQuote, '--- deleteQuote ---');

    const quoteParam12 = await prismaClient.quote_parameter.create({
      data: {
        top_number: 27,
        left_side_number: 39,
        bottom_left_number: 51,
        bottom_right_number: 3,
        right_side_number: 15,
        right_side_arrow: 'up',
      },
    });

    // Then create the fate quotes with references to the quote parameters
    const fateQuotes = await prismaClient.fate_quote.createMany({
      data: [
        {
          date: moment.utc('2004-10-10 01:00:00').toDate(),
          gender: 'male',
          year_count: 60,
          quote_parameter_id: quoteParam12.id,
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

updateQuote();
