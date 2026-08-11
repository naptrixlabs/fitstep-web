import { Link } from 'react-router-dom';
import { Mark } from '../components/Mark';

export function NotFoundPage() {
  return (
    <div className="notfound">
      <Mark size={72} animate idc="nf" />
      <h1>Off the path.</h1>
      <p>We couldn’t find that page. Let’s get you back on track.</p>
      <Link className="btn btn-primary" to="/">Back to home</Link>
    </div>
  );
}
