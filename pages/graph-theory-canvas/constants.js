export const MOVE_BUTTON = 'move';
export const VERTEX_BUTTON = 'vertex';
export const EDGE_BUTTON = 'edge';
export const UNDO_BUTTON = 'undo';
export const CLEAR_BUTTON = 'clear';
export const IMPORT_BUTTON = 'import';
export const EXPORT_BUTTON = 'export';

export const DIRECTED_GRAPH = 'directed';
export const UNDIRECTED_GRAPH = 'undirected';
export const WEIGHTED_GRAPH = 'weighted';
export const UNWEIGHTED_GRAPH = 'unweighted';

//event keydown key
export const BACKSPACE = 'Backspace';
export const ENTER = 'Enter';

//event name
export const E_SUBMIT = 'submit';
export const E_KEYDOWN = 'keydown';
export const E_CLICK = 'click';

//TEXT
export const MESS_DRAW_GRAPH_FIRST = 'Vui lòng vẽ đồ thị trước!';
export const MESS_GRAPH_WEIGHTED = 'Vui lòng chọn loại đồ thị có trọng số!';
export const CONCLUDE_TOTAL_WEIGHTED = `. Tổng trọng số của cây khung W(G):`;
export const TEXT_ALG_TABLE = '. Bảng thuật toán:';
export const TEXT_GRAPH = '. Đồ thị:';
export const TEXT_DIRECTION = '. Đường đi:';
export const TEXT_MIN_DISTANCE = (start, end, distance) =>
    `⇒ Đường đi ngắn nhất từ đỉnh ${start} → ${end} có độ dài là: ${distance}`;
