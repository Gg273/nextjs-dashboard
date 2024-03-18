// pages/index.js
import HaplotypeGraph from './LinePlot';

const haplotypeData = [
  { id: 1, label: 'Hap1', connections: [2, 3, 4] },
  { id: 2, label: 'Hap2', connections: [1, 3] },
  { id: 3, label: 'Hap3', connections: [1, 2, 4] },
  { id: 4, label: 'Hap4', connections: [1, 3] },
  { id: 5, label: 'Hap5', connections: [1] },
];

const Home = () => {
  return (
    <div>
      <h1>Haplotype Network Graph</h1>
      <HaplotypeGraph data={haplotypeData} />
    </div>
  );
};

export default Home;
