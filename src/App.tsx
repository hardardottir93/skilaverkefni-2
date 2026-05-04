import { HomePage } from '@feature/shell/pages/HomePage';
import { DataPersist } from '@/shared/components/DataPersist';
import { GlobalProvider } from '@/shared/context';
import './index.css';

export default function App() {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-6">
      <GlobalProvider>
        <DataPersist>
          <HomePage />
        </DataPersist>
      </GlobalProvider>
    </div>
  );
}
