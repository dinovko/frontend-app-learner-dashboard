import React from "react";
import "./BelesStatistic.scss";

const modules = [
  { name: "Модуль 1", completed: true },
  { name: "Модуль 2", completed: true },
  { name: "Модуль 3", completed: false },
  { name: "Модуль 4", completed: false },
];

const chartData = [
  33, 39, 30.93, 39.25, 25.57, 33.31, 74.94, 113, 101, 89, 101, 105, 82, 59.47,
  101, 113,
];

const highlightedBarIndex = 7; // 8-й элемент (индекс 7)

const BelesStatistic = () => {
  return (
    <div className="wrapper">
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Статистика от Beles AI</h2>

          <div className="stats-grid">
            {/* Блок прогресса изучения */}
            <div className="progress-block">
              <div className="block-header">
                <span className="block-title">Тема изучена на:</span>
                <span className="block-value">50%</span>
              </div>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "50%" }}></div>
              </div>

              <div className="modules-list">
                {modules.map((module, index) => (
                  <div
                    key={index}
                    className={`module-item ${module.completed ? "completed" : "incomplete"}`}
                  >
                    {module.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Блок последнего теста */}
            <div className="last-test-block">
              <div className="block-header">
                <span className="block-title">
                  Результаты последнего теста:
                </span>
                <span className="block-value">100%</span>
              </div>

              <div className="test-progress-bar">
                <div className="test-progress-fill"></div>
              </div>

              <div className="block-title test-description">
                Улучши результаты или закрепи знания
              </div>
              <button
                className="test-link"
                onClick={() => console.log("Переход к тесту")}
              >
                Пройти тест
              </button>
            </div>

            {/* Блок графика */}
            <div className="chart-block">
              <div className="block-header">
                <span className="block-title">Результаты теста за год</span>
              </div>

              <div className="chart-container">
                {chartData.map((height, index) => (
                  <div
                    key={index}
                    className={`chart-bar ${index === highlightedBarIndex ? "highlighted" : ""}`}
                    style={{ height: `${height}px` }}
                  >
                    {index === highlightedBarIndex && (
                      <div className="chart-max-label">100%</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="chart-labels">
                <div className="chart-label">24 июля</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BelesStatistic;
