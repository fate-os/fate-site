import { NextApiRequest } from 'next';
import axios from 'axios';

interface LocationPropsType {
  req: NextApiRequest;
}

export class GetLocation {
  public ip: string | undefined;

  constructor(parameters: LocationPropsType) {
    const { req } = parameters;
    this.ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '';
  }

  async getCurrentDetails() {
    try {
      const { data } = await axios.get(`https://ipapi.co/${this.ip}/json/`);
      return {
        country: data?.country_name || '',
        country_code: data?.country_code || '',
        calling_code: data?.country_calling_code || '',
        city: data?.city || '',
      };
    } catch (error) {
      console.error('Error fetching location data:', error);
      return {
        country: '',
        country_code: '',
        calling_code: '',
        city: '',
      };
    }
  }
}
