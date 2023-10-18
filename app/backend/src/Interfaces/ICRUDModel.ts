import { ID } from '.';
import { ITeam } from './teams/Iteam';

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

export interface IFindById<T> {
  findById(id: ID): Promise<T | null>,
}

export interface ICRUDModelUpdater<T> {
  update(id: ID, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  delete(id: ID): Promise<number>,
}

export interface ICRUDModelQuery{
  findByQuery(q: string): Promise<ITeam[]>
}

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>, ICRUDModelReader<T>, ICRUDModelUpdater<T>, ICRUDModelQuery,
  ICRUDModelDeleter { }
