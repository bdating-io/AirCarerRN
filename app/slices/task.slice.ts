import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Image = string;

interface Property {
  id: string;
  uId?: string;
  address: string;
  type: 'Apartment' | 'House' | 'Townhouse';
  bedroom: string;
  bathroom: string;
  images: Image[];
}

export interface Task {
  id: string;
  cId?: string;
  status?: 'posted' | 'ongoing' | 'Finished' | 'cancelled' | 'expired';
  propertyId?: string|null;
  property?: Property|null;
  startTime: Date;
  isFlexible: boolean;
  type?: 'regular' | 'EndOfLease';
  equipmentProvided?: boolean;
  details?: string;
  estimateTime?: number;
  budget?: number;
  descImages?: Image[];
  imageBefore?: Image[];
  imageAfter?: Image[];
  cRating?: number;
  pRating?: number;
  pId?: string;
}

interface TaskState {
  currentTask: Task | null;
  tasks: Task[];
  filteredTasks: Task[];
  taskStatus: 'idle' | 'loading' | 'failed';
  error: string | null;
  draftTask: Partial<Task> | null;
}

const initialState: TaskState = {
  currentTask: null,
  tasks: [],
  filteredTasks: [],
  taskStatus: 'idle',
  error: null,
  draftTask: null
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.filteredTasks = action.payload;
    },
    setFilteredTasks: (state, action: PayloadAction<Task[]>) => {
      state.filteredTasks = action.payload;
    },
    setTaskStatus: (state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
      state.taskStatus = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateDraftTask: (state, action: PayloadAction<Partial<Task>>) => {
      state.draftTask = { ...state.draftTask, ...action.payload };
    },
    clearDraftTask: (state) => {
      state.draftTask = null;
    }
  }
});

export const { 
  setCurrentTask, 
  setTasks, 
  setFilteredTasks, 
  setTaskStatus, 
  setError,
  updateDraftTask,
  clearDraftTask 
} = taskSlice.actions;
export const { reducer } = taskSlice;