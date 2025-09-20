import { GraphQLError } from 'graphql';
import { AppContext } from '../../types';
import { FateOsClient } from '@/db/prisma';
import moment from 'moment';

// Argument types for getFateQuote
type GetFateQuoteArgs = {
  date: string;
  gender?: string;
  shine?: boolean;
  history_id?: string;
  year_count?: number;
};

const getFateQuote = async (_: any, args: GetFateQuoteArgs, context: AppContext) => {
  try {
    const { date, gender, shine, history_id } = args;

    if (!context.account?.account) {
      return {
        success: false,
        message: 'Unable to find user, please log in and try again',
      };
    }

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

    // Check if user is super admin - if so, skip purchase requirement
    const isSuperAdmin = context.account.account.super_admin === true;

    // Determine the year_count to use for the query
    let queryYearCount = args.year_count; // Default to the year_count from arguments

    // If not super admin and history_id is provided, check the payment history count
    let shouldFilterQuoteParameters = false;
    if (!isSuperAdmin && history_id) {
      const paymentHistory = await FateOsClient.payment_history.findUnique({
        where: {
          id: history_id,
        },
        select: {
          year_count: true,
          is_credit_used: true,
          used_date: true,
        },
      });

      // Check if credit is already used for a different time
      if (paymentHistory?.is_credit_used && paymentHistory.used_date) {
        const usedDateTime = moment(paymentHistory.used_date);
        const requestedDateTime = moment(exactDateUTC);

        // Only block if they're trying to view a different time
        // Allow unlimited views of the same time they already used
        if (!usedDateTime.isSame(requestedDateTime, 'second')) {
          return {
            success: false,
            message:
              'Your purchased credit has been used. Please buy more to view additional results',
            result: null,
          };
        }
      }

      // Use year_count from payment_history for non-super admin users
      if (paymentHistory) {
        queryYearCount = paymentHistory.year_count;

        // If payment history exists and year_count is not 60, filter quote parameters
        if (paymentHistory.year_count !== 60) {
          shouldFilterQuoteParameters = true;
        }
      }
    }

    // Build the where clause for quote parameters
    const quoteParameterWhere: any = {};

    // If we need to filter quote parameters, exclude the specified fields
    if (shouldFilterQuoteParameters) {
      quoteParameterWhere.AND = [
        { top_number: null },
        { right_side_number: null },
        { bottom_right_number: null },
        { bottom_left_number: null },
        { left_side_number: null },
        { perpendicular: null },
      ];
    }

    // Add shine filter if needed
    if (shine) {
      quoteParameterWhere.shine = 'up';
    }

    console.log('queryYearCount', queryYearCount);
    // Find fate quote with related quote parameters
    // Search for exact time match in UTC
    const [fateQuote] = await FateOsClient.fate_quote.findMany({
      where: {
        date: exactDateUTC,
        ...(gender && { gender }),
        ...(queryYearCount && { year_count: queryYearCount }),
        quote_parameter: quoteParameterWhere,
      },
      include: {
        quote_parameter: true,
      },
      take: 1,
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
      date: fateQuote?.date?.toISOString(),
      gender: fateQuote.gender,
      quote_parameters: {
        id: fateQuote?.quote_parameter?.id,
        shine: fateQuote?.quote_parameter?.shine,
        straight_left: fateQuote?.quote_parameter?.straight_left,
        straight_right: fateQuote?.quote_parameter?.straight_right,
        straight_bottom: fateQuote?.quote_parameter?.straight_bottom,
        top_number: fateQuote?.quote_parameter?.top_number,
        right_side_number: fateQuote?.quote_parameter?.right_side_number,
        bottom_right_number: fateQuote?.quote_parameter?.bottom_right_number,
        bottom_left_number: fateQuote?.quote_parameter?.bottom_left_number,
        left_side_number: fateQuote?.quote_parameter?.left_side_number,
        right_side_arrow: fateQuote?.quote_parameter?.right_side_arrow,
        left_side_arrow: fateQuote?.quote_parameter?.left_side_arrow,
        bottom_arrow: fateQuote?.quote_parameter?.bottom_arrow,
        perpendicular: fateQuote?.quote_parameter?.perpendicular,
        has_circle: fateQuote?.quote_parameter?.has_circle,
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
