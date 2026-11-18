import classNames from 'classnames';
import styles from './FilterItem.module.css';

type FilterItemProps = {
  title: string;
  list: string[];
  isActive: boolean;
  onClick: () => void;
  onSelect: (item: string) => void;
  selectedItems?: string[];
  selectedCount?: number;
};

export default function FilterItem({
  title,
  list,
  isActive,
  onClick,
  onSelect,
  selectedItems = [],
  selectedCount = 0,
}: FilterItemProps) {
  const hasSelected = selectedCount > 0;

  return (
    <div className={styles.filter__wrapper}>
      <div
        className={classNames(styles.filter__button, {
          [styles.active]: isActive || hasSelected,
        })}
        onClick={onClick}
      >
        {title}
      </div>

      {hasSelected && <span className={styles.badge}>{selectedCount}</span>}

      {isActive && (
        <div className={styles.filter__popup}>
          <ul className={styles.filter__list}>
            {list.map((item) => {
              const isSelected = selectedItems.includes(item);
              return (
                <li
                  key={item}
                  className={classNames(styles.filter__item, {
                    [styles.filter__item_active]: isSelected,
                  })}
                  onClick={() => onSelect(item)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
