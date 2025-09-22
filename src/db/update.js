import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prismaClient = new PrismaClient();

const createQuote1 = async () => {
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
  // const quoteParams = await prismaClient.fate_quote.findFirst({
  //   where: { date: moment.utc('1935-07-03 13:30:00').toDate(), gender: 'male', year_count: 1 },
  // });
  const quoteParams2 = await prismaClient.fate_quote.findFirst({
    where: { date: moment.utc('1980-07-20 13:30:00').toDate(), gender: 'female', year_count: 1 },
  });
  console.log(quoteParams2, '--- quoteParams2 ---');
  const updateQuoteParam2 = await prismaClient.quote_parameter.update({
    where: { id: quoteParams2.quote_parameter_id },
    data: { straight_left: 'up', straight_right: null },
  });
  console.log(updateQuoteParam2, '--- updateQuoteParam2 ---');
};

// updateQuoteParameter();

const createQuote2 = async () => {
  const quote20 = await prismaClient.quote_parameter.create({
    data: {
      top_number: 20,
      left_side_number: 8,
      bottom_left_number: 56,
      bottom_right_number: 44,
      right_side_number: 32,
    },
  });

  const quoteParam20 = await prismaClient.fate_quote.create({
    data: {
      date: moment.utc('1980-07-20 13:30:00').toDate(),
      gender: 'female',
      year_count: 60,
      quote_parameter_id: quote20.id,
    },
  });

  console.log(quote20, '--- quote20 ---');
  console.log(quoteParam20, '--- quoteParam20 ---');
};

const createQuote3 = async () => {
  const quote21 = await prismaClient.quote_parameter.create({
    data: {
      straight_left: 'down',
      straight_right: 'down',
    },
  });

  const quoteParam21 = await prismaClient.fate_quote.create({
    data: {
      date: moment.utc('1962-10-29 13:30:00').toDate(),
      gender: 'male',
      year_count: 1,
      quote_parameter_id: quote21.id,
    },
  });

  console.log(quote21, '--- quote21 ---');
  console.log(quoteParam21, '--- quoteParam21 ---');
};

const createQuote4 = async () => {
  const quote22 = await prismaClient.quote_parameter.create({
    data: {
      straight_left: 'up',
      straight_right: 'up',
    },
  });

  const quoteParam22 = await prismaClient.fate_quote.create({
    data: {
      date: moment.utc('1971-09-01 10:00:00').toDate(),
      gender: 'male',
      year_count: 1,
      quote_parameter_id: quote22.id,
    },
  });

  console.log(quote22, '--- quote22 ---');
  console.log(quoteParam22, '--- quoteParam22 ---');
};

// const updateQuote4Date = async () => {
//   try {
//     // Find the fate quote with the original date
//     const existingQuote = await prismaClient.fate_quote.findFirst({
//       where: {
//         date: moment.utc('1971-01-09 10:00:00').toDate(),
//         gender: 'male',
//         year_count: 1,
//       },
//     });

//     if (existingQuote) {
//       // Update the date to September 01, 1971
//       const updatedQuote = await prismaClient.fate_quote.update({
//         where: { id: existingQuote.id },
//         data: {
//           date: moment.utc('1971-09-01 10:00:00').toDate(),
//         },
//       });

//       console.log('Updated quote:', updatedQuote);
//     } else {
//       console.log('No quote found with the specified criteria');
//     }
//   } catch (error) {
//     console.error('Error updating quote date:', error);
//   }
// };

const createQuote5 = async () => {
  const quote23 = await prismaClient.quote_parameter.create({
    data: {
      straight_left: 'down',
    },
  });

  const quoteParam23 = await prismaClient.fate_quote.create({
    data: {
      date: moment.utc('1962-10-23 15:30:00').toDate(),
      gender: 'male',
      year_count: 1,
      quote_parameter_id: quote23.id,
    },
  });

  console.log(quote23, '--- quote23 ---');
  console.log(quoteParam23, '--- quoteParam23 ---');
};

const createQuote6 = async () => {
  const quote24 = await prismaClient.quote_parameter.create({
    data: {
      straight_left: 'down',
      straight_right: 'down',
      has_circle: true,
    },
  });

  const quoteParam24 = await prismaClient.fate_quote.create({
    data: {
      date: moment.utc('1976-10-06 11:40:00').toDate(),
      gender: 'female',
      year_count: 1,
      quote_parameter_id: quote24.id,
    },
  });

  console.log(quote24, '--- quote24 ---');
  console.log(quoteParam24, '--- quoteParam24 ---');
};

const createQuote7 = async () => {
  const quote25 = await prismaClient.quote_parameter.create({
    data: {
      straight_bottom: 'both_left_and_right',
    },
  });

  const quoteParam25 = await prismaClient.fate_quote.create({
    data: {
      date: moment.utc('1990-03-01 01:10:00').toDate(),
      gender: 'female',
      year_count: 1,
      quote_parameter_id: quote25.id,
    },
  });

  console.log(quote25, '--- quote25 ---');
  console.log(quoteParam25, '--- quoteParam25 ---');
};

const createQuote8 = async () => {
  const quote26 = await prismaClient.quote_parameter.create({
    data: {
      straight_left: 'up',
      has_circle: true,
    },
  });

  const quoteParam26 = await prismaClient.fate_quote.create({
    data: {
      date: moment.utc('2020-05-10 19:40:00').toDate(),
      gender: 'male',
      year_count: 1,
      quote_parameter_id: quote26.id,
    },
  });

  console.log(quote26, '--- quote26 ---');
  console.log(quoteParam26, '--- quoteParam26 ---');
};

const updateQuote8Time = async () => {
  try {
    // Find the fate quote with the original time
    const existingQuote = await prismaClient.fate_quote.findFirst({
      where: {
        date: moment.utc('2020-05-10 19:40:00').toDate(),
        gender: 'male',
        year_count: 1,
      },
    });

    if (existingQuote) {
      // Update the time to 11:30 PM (23:30)
      const updatedQuote = await prismaClient.fate_quote.update({
        where: { id: existingQuote.id },
        data: {
          date: moment.utc('2020-05-10 23:30:00').toDate(),
        },
      });

      console.log('Updated quote8 time:', updatedQuote);
    } else {
      console.log('No quote found with the specified criteria');
    }
  } catch (error) {
    console.error('Error updating quote8 time:', error);
  }
};

const createQuote9 = async () => {
  const quote27 = await prismaClient.quote_parameter.create({
    data: {
      straight_left: 'up',
      has_circle: true,
    },
  });

  const quoteParam27 = await prismaClient.fate_quote.create({
    data: {
      date: moment.utc('1962-10-16 23:30:00').toDate(),
      gender: 'male',
      year_count: 1,
      quote_parameter_id: quote27.id,
    },
  });

  console.log(quote27, '--- quote27 ---');
  console.log(quoteParam27, '--- quoteParam27 ---');
};

const createMultipleQuotes = async () => {
  try {
    // Create quote parameters for all 3 quotes
    const quoteParams = await prismaClient.$transaction([
      // Quote 1: shine:up
      prismaClient.quote_parameter.create({
        data: { shine: 'up' },
      }),
      // Quote 2: has_circle:true, straight_left:down
      prismaClient.quote_parameter.create({
        data: {
          has_circle: true,
          straight_left: 'down',
        },
      }),
      // Quote 3: has_circle:true, straight_bottom:straight_horizontal
      prismaClient.quote_parameter.create({
        data: {
          has_circle: true,
          straight_bottom: 'straight_horizontal',
        },
      }),
    ]);

    // Create fate quotes for all 3
    const fateQuotes = await prismaClient.fate_quote.createMany({
      data: [
        // Quote 1: 1:30pm 7-20/1980 / Female - 60 year
        {
          date: moment.utc('1980-07-20 13:30:00').toDate(),
          gender: 'female',
          year_count: 60,
          quote_parameter_id: quoteParams[0].id,
        },
        // Quote 2: 23:30 october/16/1962/ male - 1year
        {
          date: moment.utc('1962-10-16 23:30:00').toDate(),
          gender: 'male',
          year_count: 1,
          quote_parameter_id: quoteParams[1].id,
        },
        // Quote 3: 1976/10-6/11:40am /female/ 1year
        {
          date: moment.utc('1976-10-06 11:40:00').toDate(),
          gender: 'female',
          year_count: 1,
          quote_parameter_id: quoteParams[2].id,
        },
      ],
    });

    console.log('Quote parameters created:', quoteParams);
    console.log('Fate quotes created:', fateQuotes.count);
  } catch (error) {
    console.error('Error creating multiple quotes:', error);
    throw new Error(error);
  } finally {
    await prismaClient.$disconnect();
  }
};

// createQuote3();
// createQuote4();
// updateQuote4Date();
// createQuote5();
// createQuote6();
// createQuote7();
// createQuote8();
// updateQuote8Time();
// createQuote9();
createMultipleQuotes();
