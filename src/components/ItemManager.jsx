import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { addItem, updateItem, deleteItem, loadStoredData } from '../features/items/itemSlice';
import styles from '../styles/itemManager.module.scss';

const ItemManager = () => {
  const items = useSelector((state) => state.items.list);
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const [currentItemId, setCurrentItemId] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    dispatch(loadStoredData(storedItems));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleSaveItem = () => {
    if (inputText.trim() === '') return;

    const isDuplicate = items.some(item => item.text.trim().toLowerCase() === inputText.trim().toLowerCase());
    if (isDuplicate && !currentItemId) {
      setAlertMessage('This entry already exists.');
      return;
    }

    setAlertMessage('');

    if (currentItemId) {
      dispatch(updateItem({ id: currentItemId, text: inputText }));
      setCurrentItemId(null);
    } else {
      dispatch(addItem({ id: Date.now(), text: inputText }));
    }
    setInputText('');
  };

  const handleEditItem = (item) => {
    setInputText(item.text);
    setCurrentItemId(item.id);
    setAlertMessage('');
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Item Manager</h1>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={handleSaveItem} className={styles.button}>{currentItemId ? 'Update' : 'Add'}</button>
      </div>
      {alertMessage && <p className={styles.alertMessage}>{alertMessage}</p>}
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.listItem}>
            {item.text}
            <div>
              <button onClick={() => handleEditItem(item)} className={styles.listItemButton}>Edit</button>
              <button onClick={() => handleDeleteItem(item.id)} className={styles.listItemButton}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemManager;
