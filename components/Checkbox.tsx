import styles from '../styles/Todo.module.css'

interface CheckboxProps {
  isChecked: boolean;
  onToggle: () => void;
}

export const Checkbox = ({isChecked, onToggle}: CheckboxProps) => {
  return (
    <div className={styles.checkbox}>
      <label>
        <input 
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
        />
      </label>
    </div>
  );
}