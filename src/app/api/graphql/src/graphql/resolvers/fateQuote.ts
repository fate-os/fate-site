import { GraphQLError } from 'graphql';
import { AppContext } from '../../types';
import { FateOsClient } from '@/db/prisma';
import moment from 'moment';

// Argument types for getFateQuote
type GetFateQuoteArgs = {
  date: string;
  gender?: string;
};

const getFateQuote = async (_: any, args: GetFateQuoteArgs, context: AppContext) => {
  try {
    const { date, gender } = args;

    if (!date) {
      return {
        success: false,
        message: 'Date is required',
        result: null,
      };
    }

    // Parse the date string using moment.js
    const parsedDate = moment(date);

    if (!parsedDate.isValid()) {
      return {
        success: false,
        message: 'Invalid date format',
        result: null,
      };
    }

    // Convert to UTC date for exact time matching (to match database format)
    const exactDateUTC = parsedDate.utc().toDate();

    // Find fate quote with related quote parameters
    // Search for exact time match in UTC
    const fateQuote = await FateOsClient.fate_quote.findFirst({
      where: {
        date: exactDateUTC,
        ...(gender && { gender }),
      },
      include: {
        quote_parameters: true,
      },
    });

    if (!fateQuote) {
      return {
        success: false,
        message: 'No fate quote found for the given date and gender',
        result: null,
      };
    }

    // Transform the data to match GraphQL schema
    const result = {
      id: fateQuote.id,
      year_count: fateQuote.year_count,
      date: fateQuote.date.toISOString(),
      gender: fateQuote.gender,
      quote_parameters: {
        id: fateQuote.quote_parameters.id,
        shine: fateQuote.quote_parameters.shine,
        straight_left: fateQuote.quote_parameters.straight_left,
        straight_right: fateQuote.quote_parameters.straight_right,
        straight_bottom: fateQuote.quote_parameters.straight_bottom,
        top_number: fateQuote.quote_parameters.top_number,
        right_side_number: fateQuote.quote_parameters.right_side_number,
        bottom_right_number: fateQuote.quote_parameters.bottom_right_number,
        bottom_left_number: fateQuote.quote_parameters.bottom_left_number,
        left_side_number: fateQuote.quote_parameters.left_side_number,
        right_side_arrow: fateQuote.quote_parameters.right_side_arrow,
        left_side_arrow: fateQuote.quote_parameters.left_side_arrow,
        bottom_arrow: fateQuote.quote_parameters.bottom_arrow,
      },
    };

    return {
      success: true,
      message: 'Fate quote retrieved successfully',
      result,
    };
  } catch (error: any) {
    console.log(error);
    throw new GraphQLError(error.message || 'Failed to retrieve fate quote');
  }
};

const resolver = {
  Query: {
    getFateQuote,
  },
};

export default resolver;
