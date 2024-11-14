import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid'
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corola'
        },
        {
            id: uuid(),
            brand: 'Nissan',
            model: 'Sentra'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
    ]

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(c => c.id == id);

        if (!car)
            throw new NotFoundException(`Car not found`);

        return car
    }

    create(data: CreateCarDto) {
        const car = {
            brand: data.brand,
            model: data.model,
            id: uuid()
        }

        this.cars.push(car)
        return car;
    }

    update(id: string, data: UpdateCarDto) {
        let carDb = this.findOneById(id);

        if (data.id && data.id !== id)
            throw new BadRequestException('Invlaid car id');

        this.cars = this.cars.map(c => {
            if (c.id === id) {
                carDb = {
                    ...carDb,
                    ...data,
                    id,
                }
                return carDb
            }
            return c
        })

        return carDb;
    }

    delete(id: string) {

        const carDb = this.findOneById(id);

        this.cars = this.cars.filter(c => c.id !== carDb.id)
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars
    }
}
