import ForkHero from './services/hub/ForkHero';
import ServiceRibbon from './services/hub/ServiceRibbon';
import GrowthOrbit from './services/hub/GrowthOrbit';
import BuildLab from './services/hub/BuildLab';
import BeforeAfter from './services/hub/BeforeAfter';
import PlanBuilder from './services/hub/PlanBuilder';
import PromiseCard from './services/hub/PromiseCard';
import '../styles/services-hub.css';

export default function Services() {
  return (
    <div id="services" className="hub">
      <ForkHero />
      <ServiceRibbon />
      <GrowthOrbit />
      <BuildLab />
      <BeforeAfter />
      <PlanBuilder />
      <PromiseCard />
    </div>
  );
}
