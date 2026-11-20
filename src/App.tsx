import Header from './components/Header';
import HeroPanorama from './components/HeroPanorama';
import Projects from './components/Projects';
import Services from './components/Services';
import Footer from './components/Footer';
import Process from './components/Process';
import Includes from './components/Includes';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroPanorama />
        <Projects />
        <Services />
        <Process />
        <Includes />
      </main>
      <Footer />
    </>
  );
}