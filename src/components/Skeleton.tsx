import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonCard() {
    return(
        <SkeletonTheme baseColor="#D3D3D3" highlightColor="#E0E0E0">
          <div className="list">
            {new Array(24).fill(null).map((_, i) => <Skeleton key={i} className='skeleton-character' borderRadius="20px"/>)}
          </div>
        </SkeletonTheme>
    )
}

export default SkeletonCard;