import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';

export default function FavoritesPage() {
  return (
    <PrivateRoute>
      <div style={{ flexGrow: 1, padding: '20px 40px' }}>
        <h2 style={{ color: '#ffffff', fontSize: '64px' }}>Мои треки</h2>
      </div>
    </PrivateRoute>
  );
}
