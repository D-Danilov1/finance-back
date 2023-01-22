import { Funds } from '../../models/funds.model';
import { FUNDS } from '../../../../../constants/funds.constants';

export const fundsStub = (): Funds => {
  return <Funds>{
    id: 1,
    name: FUNDS.MAIN,
    user_id: '4b6bea0b-62d4-40a9-a350-ae40632dc15f',
    percent: 100,
    is_active: false,
    is_system: false,
  };
};
