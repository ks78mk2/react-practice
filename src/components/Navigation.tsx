import Icon from '@mdi/react';
import { mdiBookOutline } from '@mdi/js';

const Navigation = () => {
  return (
    <div className="navBox">
      <Icon color="#FF893C" path={mdiBookOutline} size={1} />
      <p>내 서재</p>
    </div>
  );
};

export default Navigation;