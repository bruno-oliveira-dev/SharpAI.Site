import CustomCursor from '../../components/CustomCursor';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { getAllInsights, getAllTags } from '../../lib/insights';
import InsightsBrowser from './InsightsBrowser';

export const metadata = {
  title: 'Insights',
  description:
    'Ensaios curtos sobre engenharia de IA, agentes em produção, RAG, evals, arquitetura e o que vemos quebrar.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Insights · SharpAI',
    description: 'Ensaios sobre engenharia de IA e agentes em produção.',
    type: 'website',
    url: 'https://sharpai.com.br/insights',
  },
};

export default function InsightsListPage() {
  const articles = getAllInsights().map(({ content, ...rest }) => rest);
  const tags = getAllTags();
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <InsightsBrowser articles={articles} tags={tags} />
      </main>
      <Footer />
    </>
  );
}
