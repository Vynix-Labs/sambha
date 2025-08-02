'use client'

import React, { useState, useRef, useCallback } from "react";
import {
  Search,
  Bell,
  ChevronLeft,
  Grid3X3,
  Type,
  Users,
  Check,
  Minus,
  Plus,
  X,
} from "lucide-react";

const SeatingChartDesigner = () => {
  // State
  const [tables, setTables] = useState([]);
  const [chairs, setChairs] = useState([]);
  const [textItems, setTextItems] = useState([]);
  const [activeTab, setActiveTab] = useState("items");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedTable, setSelectedTable] = useState(null);
  const [dragState, setDragState] = useState({
    isDragging: false,
    draggedItem: null,
    itemType: null,
    offset: { x: 0, y: 0 },
  });
  const [tableCounter, setTableCounter] = useState(1);

  const canvasRef = useRef(null);

  // Constants
  const AVAILABLE_GUESTS = [
    "Kathryn Murphy",
    "John Smith",
    "Emily Davis",
    "Michael Brown",
    "Sarah Wilson",
    "David Johnson",
    "Lisa Anderson",
    "Robert Taylor",
  ];

  const FONT_OPTIONS = [
    "Arial",
    "Helvetica",
    "Inter",
    "Montserrat",
    "Open Sans",
  ];

  // Helper functions
  const snapToGrid = (position) => {
    const gridSize = 20;
    return {
      x: Math.round(position.x / gridSize) * gridSize,
      y: Math.round(position.y / gridSize) * gridSize,
    };
  };

  const getTableDimensions = (type) => {
    switch (type) {
      case "long":
        return { width: 120, height: 40 };
      case "round":
        return { width: 80, height: 80 };
      case "square":
        return { width: 80, height: 80 };
      default:
        return { width: 80, height: 80 };
    }
  };

  const generateChairPositions = (table) => {
    const positions = [];
    const seats = table.seats || 6;

    if (table.type === "round") {
      const radius = 60;
      for (let i = 0; i < seats; i++) {
        const angle = (i * 2 * Math.PI) / seats - Math.PI / 2;
        positions.push({
          x: table.position.x + radius * Math.cos(angle),
          y: table.position.y + radius * Math.sin(angle),
        });
      }
    } else if (table.type === "long") {
      const perSide = Math.ceil(seats / 2);
      for (let i = 0; i < seats; i++) {
        if (i < perSide) {
          positions.push({
            x: table.position.x - 60 + (i * 120) / (perSide - 1 || 1),
            y: table.position.y - 50,
          });
        } else {
          positions.push({
            x:
              table.position.x -
              60 +
              ((i - perSide) * 120) / (seats - perSide - 1 || 1),
            y: table.position.y + 50,
          });
        }
      }
    } else {
      // square
      const perSide = Math.ceil(seats / 4);
      for (let i = 0; i < seats; i++) {
        const side = Math.floor(i / perSide);
        const pos = i % perSide;

        switch (side) {
          case 0: // top
            positions.push({
              x: table.position.x - 40 + (pos * 80) / (perSide - 1 || 1),
              y: table.position.y - 50,
            });
            break;
          case 1: // right
            positions.push({
              x: table.position.x + 50,
              y: table.position.y - 40 + (pos * 80) / (perSide - 1 || 1),
            });
            break;
          case 2: // bottom
            positions.push({
              x: table.position.x + 40 - (pos * 80) / (perSide - 1 || 1),
              y: table.position.y + 50,
            });
            break;
          default: // left
            positions.push({
              x: table.position.x - 50,
              y: table.position.y + 40 - (pos * 80) / (perSide - 1 || 1),
            });
        }
      }
    }

    return positions.slice(0, seats);
  };


  // create sit for any table click
  const createChairsForTable = (table) => {
    const positions = generateChairPositions(table);
    return positions.map((position, index) => ({
      id: `chair-${table.id}-${index + 1}`,
      tableId: table.id,
      seatNumber: index + 1,
      position: snapToGrid(position),
      guestName: table.seatAssignments?.[index + 1] || null,
    }));
  };

  const checkCollision = (newTable, existingTables) => {
    const newDims = getTableDimensions(newTable.type);
    const buffer = 20;

    return existingTables.some((table) => {
      if (table.id === newTable.id) return false;

      const dims = getTableDimensions(table.type);
      const distance = Math.sqrt(
        Math.pow(newTable.position.x - table.position.x, 2) +
          Math.pow(newTable.position.y - table.position.y, 2)
      );

      return distance < (newDims.width + dims.width) / 2 + buffer;
    });
  };

  // Event handlers
  const addTable = (type) => {
    const defaultSeats = type === "long" ? 12 : type === "round" ? 8 : 6;
    let position = snapToGrid({ x: 400, y: 300 });

    const newTable = {
      id: `table-${Date.now()}`,
      type,
      position,
      name: `Table ${tableCounter}`,
      seats: defaultSeats,
      seatAssignments: { 1: "Kathryn Murphy" },
    };

    // Find available position
    let attempts = 0;
    while (checkCollision(newTable, tables) && attempts < 20) {
      position = snapToGrid({
        x: 300 + attempts * 60,
        y: 250 + Math.floor(attempts / 3) * 100,
      });
      newTable.position = position;
      attempts++;
    }

    const newChairs = createChairsForTable(newTable);

    setTables((prev) => [...prev, newTable]);
    setChairs((prev) => [...prev, ...newChairs]);
    setTableCounter((prev) => prev + 1);
  };

  const addTextBox = () => {
    const newText = {
      id: `text-${Date.now()}`,
      position: snapToGrid({ x: 300, y: 200 }),
      text: "Double click to edit",
      fontFamily: selectedFont,
    };
    setTextItems((prev) => [...prev, newText]);
  };

  const handleTableClick = (table) => {
    setSelectedTable(table);
  };

  const handleDragStart = useCallback((item, itemType, event) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offset = {
      x: event.clientX - rect.left - item.position.x,
      y: event.clientY - rect.top - item.position.y,
    };

    setDragState({
      isDragging: true,
      draggedItem: item,
      itemType,
      offset,
    });
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (!dragState.isDragging || !dragState.draggedItem || !canvasRef.current)
        return;

      const rect = canvasRef.current.getBoundingClientRect();
      const newPosition = snapToGrid({
        x: event.clientX - rect.left - dragState.offset.x,
        y: event.clientY - rect.top - dragState.offset.y,
      });

      if (dragState.itemType === "table") {
        const updatedTable = {
          ...dragState.draggedItem,
          position: newPosition,
        };

        if (!checkCollision(updatedTable, tables)) {
          setTables((prev) =>
            prev.map((table) =>
              table.id === dragState.draggedItem.id ? updatedTable : table
            )
          );

          const newChairs = createChairsForTable(updatedTable);
          setChairs((prev) => [
            ...prev.filter((chair) => chair.tableId !== updatedTable.id),
            ...newChairs,
          ]);
        }
      } else if (dragState.itemType === "chair") {
        setChairs((prev) =>
          prev.map((chair) =>
            chair.id === dragState.draggedItem.id
              ? { ...chair, position: newPosition }
              : chair
          )
        );
      }
    },
    [dragState, tables]
  );

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedItem: null,
      itemType: null,
      offset: { x: 0, y: 0 },
    });
  }, []);

  const updateSelectedTable = (updates) => {
    if (!selectedTable) return;

    const updatedTable = { ...selectedTable, ...updates };
    setTables((prev) =>
      prev.map((table) =>
        table.id === selectedTable.id ? updatedTable : table
      )
    );

    if (updates.seats !== undefined) {
      const newChairs = createChairsForTable(updatedTable);
      setChairs((prev) => [
        ...prev.filter((chair) => chair.tableId !== updatedTable.id),
        ...newChairs,
      ]);
    } else {
      setChairs((prev) =>
        prev.map((chair) =>
          chair.tableId === updatedTable.id
            ? {
                ...chair,
                guestName:
                  updatedTable.seatAssignments?.[chair.seatNumber] || null,
              }
            : chair
        )
      );
    }

    setSelectedTable(updatedTable);
  };

  const updateSeatCount = (newSeatCount) => {
    if (!selectedTable) return;

    const newAssignments = {};
    for (let i = 1; i <= newSeatCount; i++) {
      if (selectedTable.seatAssignments?.[i]) {
        newAssignments[i] = selectedTable.seatAssignments[i];
      }
    }

    updateSelectedTable({
      seats: newSeatCount,
      seatAssignments: newAssignments,
    });
  };

  const assignGuestToSeat = (seatNumber, guestName) => {
    if (!selectedTable) return;

    updateSelectedTable({
      seatAssignments: {
        ...selectedTable.seatAssignments,
        [seatNumber]: guestName,
      },
    });
  };

  const removeGuestFromSeat = (seatNumber) => {
    if (!selectedTable) return;

    const newAssignments = { ...selectedTable.seatAssignments };
    delete newAssignments[seatNumber];

    updateSelectedTable({
      seatAssignments: newAssignments,
    });
  };

  // Render functions
  const renderTable = (table) => {
    const dimensions = getTableDimensions(table.type);
    const isSelected = selectedTable?.id === table.id;

    let className =
      "border-2 border-indigo-600 bg-indigo-500 cursor-move transition-all duration-200 flex items-center justify-center text-white font-medium text-sm absolute";
    if (isSelected) className += " ring-4 ring-indigo-300 shadow-lg";
    if (dragState.isDragging && dragState.draggedItem?.id === table.id)
      className += " opacity-70";

    const style = {
      left: table.position.x - dimensions.width / 2,
      top: table.position.y - dimensions.height / 2,
      width: dimensions.width,
      height: dimensions.height,
      borderRadius: table.type === "round" ? "50%" : "8px",
      zIndex: isSelected ? 10 : 1,
    };

    return (
      <div
        key={table.id}
        className={className}
        style={style}
        onMouseDown={(e) => handleDragStart(table, "table", e)}
        onClick={(e) => {
          e.stopPropagation();
          handleTableClick(table);
        }}
      >
        {table.type === "long" && "▬"}
        {table.type === "round" && "●"}
        {table.type === "square" && "■"}
      </div>
    );
  };

  const renderChair = (chair) => {
    const isAssigned = !!chair.guestName;
    const isDragging =
      dragState.isDragging && dragState.draggedItem?.id === chair.id;

    let className =
      "w-8 h-8 rounded-full border-2 cursor-move transition-all duration-200 flex items-center justify-center text-xs font-semibold absolute";

    if (isAssigned) {
      className += " bg-green-500 border-green-600 text-white";
    } else {
      className += " bg-indigo-500 border-indigo-600 text-white";
    }

    if (isDragging) {
      className += " opacity-70 scale-110";
    }

    const style = {
      left: chair.position.x - 16,
      top: chair.position.y - 16,
      zIndex: 5,
    };

    return (
      <div
        key={chair.id}
        className={className}
        style={style}
        onMouseDown={(e) => {
          e.stopPropagation();
          handleDragStart(chair, "chair", e);
        }}
        title={chair.guestName || `Seat ${chair.seatNumber}`}
      >
        {isAssigned
          ? chair.guestName?.charAt(0).toUpperCase()
          : chair.seatNumber}
      </div>
    );
  };

  const renderTextItem = (textItem) => (
    <div
      key={textItem.id}
      className="absolute cursor-move text-gray-700"
      style={{
        left: textItem.position.x,
        top: textItem.position.y,
        fontFamily: textItem.fontFamily,
        fontSize: "16px",
      }}
    >
      {textItem.text}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-80"
              />
            </div>
            <Bell className="text-gray-600" size={24} />
          </div>
        </div>

        <div className="flex flex-1">
          {/* Left Panel */}
          <div className="w-80 bg-white border-r p-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <ChevronLeft size={16} />
              <span>Events</span>
              <span>/</span>
              <span>Oliver & Emily's Wedding</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">
                Create sitting chart
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mb-6">
              <button
                onClick={() => setActiveTab("items")}
                className={`flex flex-col items-center gap-2 pb-3 border-b-2 ${
                  activeTab === "items"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500"
                }`}
              >
                <Grid3X3 size={20} />
                <span className="text-sm">Items</span>
              </button>
              <button
                onClick={() => setActiveTab("text")}
                className={`flex flex-col items-center gap-2 pb-3 border-b-2 ${
                  activeTab === "text"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500"
                }`}
              >
                <Type size={20} />
                <span className="text-sm">Text</span>
              </button>
              <button
                onClick={() => setActiveTab("guests")}
                className={`flex flex-col items-center gap-2 pb-3 border-b-2 ${
                  activeTab === "guests"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500"
                }`}
              >
                <Users size={20} />
                <span className="text-sm">Guests</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "items" && (
              <div>
                <div className="relative mb-6">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search Items..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Seating</h3>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      See all
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <button
                      onClick={() => addTable("long")}
                      className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                    >
                      <div className="w-12 h-6 bg-indigo-500 rounded"></div>
                      <span className="text-xs text-gray-600">Long Table</span>
                    </button>

                    <button
                      onClick={() => addTable("round")}
                      className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-indigo-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Round Table</span>
                    </button>

                    <button
                      onClick={() => addTable("square")}
                      className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-indigo-500 rounded-lg"></div>
                      <span className="text-xs text-gray-600">
                        Square Table
                      </span>
                    </button>
                  </div>

                  <button className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors w-full">
                    <div className="flex gap-1">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-indigo-500 rounded-full"
                        ></div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">Seating row</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === "text" && (
              <div>
                <button
                  onClick={addTextBox}
                  className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
                >
                  <Type size={16} />
                  Add text box
                </button>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Font</h3>
                  <div className="space-y-2">
                    {FONT_OPTIONS.map((font) => (
                      <button
                        key={font}
                        onClick={() => setSelectedFont(font)}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span
                          className="text-gray-700"
                          style={{ fontFamily: font }}
                        >
                          {font}
                        </span>
                        {selectedFont === font && (
                          <Check size={16} className="text-green-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "guests" && (
              <div className="text-center text-gray-500 mt-12">
                <Users size={48} className="mx-auto mb-4 opacity-50" />
                <p>Manage guest assignments here</p>
              </div>
            )}
          </div>

          {/* Canvas */}
          <div className="flex-1 relative overflow-hidden bg-gray-50">
            <div
              ref={canvasRef}
              className="w-full h-full relative"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                cursor: dragState.isDragging ? "grabbing" : "default",
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={() => setSelectedTable(null)}
            >
              {tables.length === 0 &&
                textItems.length === 0 &&
                chairs.length === 0 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-400">
                    <div className="text-6xl mb-4">🪑</div>
                    <h3 className="text-lg font-medium mb-2">
                      Start designing your seating chart
                    </h3>
                    <p>Add tables and items from the left panel</p>
                  </div>
                )}

              {tables.map(renderTable)}
              {chairs.map(renderChair)}
              {textItems.map(renderTextItem)}
            </div>
          </div>

          {/* Right Drawer */}
          {selectedTable && (
            <div className="w-80 bg-white border-l shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => setSelectedTable(null)}>
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedTable.type === "long"
                    ? "Long Table"
                    : selectedTable.type === "round"
                      ? "Round Table"
                      : "Square Table"}
                </h2>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={selectedTable.name || ""}
                  onChange={(e) =>
                    updateSelectedTable({ name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-600 font-medium"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Seats
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Number of seats</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateSeatCount(Math.max(1, selectedTable.seats - 1))
                      }
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-medium text-gray-900 min-w-[20px] text-center">
                      {selectedTable.seats}
                    </span>
                    <button
                      onClick={() => updateSeatCount(selectedTable.seats + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {Array.from({ length: selectedTable.seats }, (_, index) => {
                    const seatNumber = index + 1;
                    const assignedGuest =
                      selectedTable.seatAssignments?.[seatNumber];

                    return (
                      <div
                        key={seatNumber}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {seatNumber}
                          </span>
                          {assignedGuest ? (
                            <span className="text-sm text-gray-900">
                              {assignedGuest}
                            </span>
                          ) : (
                            <select
                              className="text-sm text-gray-500 border-none bg-transparent cursor-pointer focus:outline-none"
                              onChange={(e) => {
                                if (e.target.value) {
                                  assignGuestToSeat(seatNumber, e.target.value);
                                }
                              }}
                              value=""
                            >
                              <option value="">Select a guest</option>
                              {AVAILABLE_GUESTS.filter(
                                (guest) =>
                                  !Object.values(
                                    selectedTable.seatAssignments || {}
                                  ).includes(guest)
                              ).map((guest) => (
                                <option key={guest} value={guest}>
                                  {guest}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>

                        {assignedGuest && (
                          <button
                            onClick={() => removeGuestFromSeat(seatNumber)}
                            className="w-5 h-5 rounded-full bg-gray-200 hover:bg-red-100 text-gray-600 hover:text-red-600 flex items-center justify-center transition-colors"
                            title="Remove guest"
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatingChartDesigner;
