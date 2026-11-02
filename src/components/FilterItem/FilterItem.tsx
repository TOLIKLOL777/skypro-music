import classNames from 'classnames';
import styles from '../FilterItem/FilterItem.module.css';

type FilterItemProps = {
  title: string;
  list: string[];
  isActive: boolean;
  onClick: () => void;
};

export default function FilterItem({
  title,
  list,
  isActive,
  onClick,
}: FilterItemProps) {
  return (
    <div className={styles.filter__wrapper}>
      <div
        className={classNames(styles.filter__button, {
          [styles.active]: isActive,
        })}
        onClick={onClick}
      >
        {title}
      </div>

      {isActive && (
        <div className={styles.filter__popup}>
          <ul className={styles.filter__list}>
            {list.map((item) => (
              <li key={item} className={styles.filter__item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
