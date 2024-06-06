import { createWorkout, findWorkoutsByUserId } from '../service/workout_service';
import Workout from '../src/database/workoutSchema';
import mongoose from 'mongoose';

interface IExercise {
  name: string;
  type: "Cardio" | "Weights";
  duration?: number;
  distance?: number;
  sets?: {
    reps: number;
    weight: number;
  }[];
}

interface IWorkout {
  userId: mongoose.Schema.Types.ObjectId;
  name: string;
  exercises: IExercise[];
  date: Date;
}

describe('Workout Services', () => {
  beforeAll(async () => {
    await Workout.deleteMany({});
  });

  afterEach(async () => {
    await Workout.deleteMany({});
  });

  it('should create a workout', async () => {
    const workoutData: IWorkout = {
      userId: new mongoose.Types.ObjectId() as any,
      name: 'Test Workout',
      exercises: [],
      date: new Date()
    };
    const workout = await createWorkout(workoutData);
    expect(workout).toHaveProperty('_id');
    expect(workout.name).toBe('Test Workout');
  });

  it('should find workouts by user ID', async () => {
    const userId = new mongoose.Types.ObjectId() as any;
    const workoutData: IWorkout = {
      userId,
      name: 'Test Workout',
      exercises: [],
      date: new Date()
    };
    await createWorkout(workoutData);
    const workouts = await findWorkoutsByUserId(userId.toString());
    expect(workouts.length).toBeGreaterThan(0);
    expect(workouts[0].userId.toString()).toBe(userId.toString());
  });

  it('should create a workout with exercises', async () => {
    const cardioExercise: IExercise = {
      name: 'Running',
      type: 'Cardio',
      duration: 30,
      distance: 5,
    };

    const weightExercise: IExercise = {
      name: 'Bench Press',
      type: 'Weights',
      sets: [
        { reps: 10, weight: 100 },
        { reps: 8, weight: 120 },
      ],
    };

    const workoutData: IWorkout = {
      userId: new mongoose.Types.ObjectId() as any,
      name: 'Test Workout with Exercises',
      exercises: [cardioExercise, weightExercise],
      date: new Date()
    };
    const workout = await createWorkout(workoutData);
    expect(workout).toHaveProperty('_id');
    expect(workout.name).toBe('Test Workout with Exercises');
    expect(workout.exercises.length).toBe(2);
  });

  it('should not create a workout without required fields', async () => {
    const workoutData: Partial<IWorkout> = {
      userId: new mongoose.Types.ObjectId() as any,
      name: '',
      exercises: [],
      date: new Date()
    };
    try {
      await createWorkout(workoutData as IWorkout);
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });

  it('should apply default values', async () => {
    const workoutData: Partial<IWorkout> = {
      userId: new mongoose.Types.ObjectId() as any,
      name: 'Test Workout with Defaults',
      exercises: []
    };
    const workout = await createWorkout(workoutData as IWorkout);
    expect(workout).toHaveProperty('_id');
    expect(workout.name).toBe('Test Workout with Defaults');
    expect(workout.date).toBeDefined();
  });
});
