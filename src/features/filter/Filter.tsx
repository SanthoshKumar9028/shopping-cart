import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./Filter.module.css";
import {
  selectMax,
  selectMin,
  selectShowOutOfStock,
  setMax,
  setMin,
  setShowOutOfStock,
} from "./filterSlice";

interface IFilterProps {
  show: boolean;
  onShowChange: React.MouseEventHandler<HTMLButtonElement>;
}

function Filter({ show, onShowChange }: IFilterProps) {
  const dispatch = useAppDispatch();

  const showOutOfStock = useAppSelector(selectShowOutOfStock);
  const min = useAppSelector(selectMin);
  const max = useAppSelector(selectMax);

  const handleMinChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setMin(+e.target.value));
  };

  const handleMaxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setMax(+e.target.value));
  };

  const handleShowOutOfStockChange: React.ChangeEventHandler<HTMLInputElement> =
    (e) => {
      dispatch(setShowOutOfStock(e.target.checked));
    };

  return (
    <section className={`${styles.filterContainer} ${show ? styles.show : ""}`}>
      <button className={styles.slideBtn} onClick={onShowChange}>
        {show ? ">" : "<"}
      </button>

      <section className={styles.filterForm}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="min">Min</label>
              </td>
              <td>
                <input
                  type="number"
                  id="min"
                  value={min}
                  onChange={handleMinChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="max">Max</label>
              </td>
              <td>
                <input
                  type="number"
                  id="max"
                  max="1000000"
                  value={max}
                  onChange={handleMaxChange}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <label htmlFor="show-outofstock">
                  <input
                    type="checkbox"
                    id="show-outofstock"
                    checked={showOutOfStock}
                    onChange={handleShowOutOfStockChange}
                  />
                  Show out of stock products
                </label>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button type="submit" onClick={onShowChange}>
                  ok
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default Filter;
