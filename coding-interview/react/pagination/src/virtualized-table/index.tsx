import React, { useRef, useState, useEffect } from 'react';

export const VirtualizedTable = ({ columns, data, rowHeight = 40, height = 400, buffer = 5 }) => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = data.length * rowHeight;
  const visibleRowCount = Math.ceil(height / rowHeight) + buffer * 2;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
  const endIndex = Math.min(data.length, startIndex + visibleRowCount);
  const visibleRows = data.slice(startIndex, endIndex);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
    
  }, []);

  return (
    <div
      ref={containerRef}
      className="virtualized-container"
      style={{ height }} // allows override via props
    >
      <table className="virtualized-table">
        <thead className="virtualized-thead">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="virtualized-th" style={{ textAlign: col.align || 'left' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Top spacer */}
          {startIndex > 0 && (
            <tr style={{ height: startIndex * rowHeight }}>
              <td colSpan={columns.length} style={{ padding: 0 }} />
            </tr>
          )}

          {/* Visible rows */}
          {visibleRows.map((row, i) => (
            <tr key={startIndex + i} className="virtualized-row" style={{ height: rowHeight }}>
              {columns.map((col, j) => (
                <td key={j} className="virtualized-td">
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}

          {/* Bottom spacer */}
          {endIndex < data.length && (
            <tr style={{ height: (data.length - endIndex) * rowHeight }}>
              <td colSpan={columns.length} style={{ padding: 0 }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
