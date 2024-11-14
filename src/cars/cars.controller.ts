import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
// @UsePipes(ValidationPipe)
export class CarsController {

    constructor(private readonly carsService: CarsService) { }

    @Get()
    getCarById() {
        return this.carsService.findAll();
    }

    @Get('/:id')
    // getAllCars(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    getAllCars(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.findOneById(id);
    }

    @Post()
    createCar(@Body() body: CreateCarDto) {
        return this.carsService.create(body)
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: UpdateCarDto
    ) {
        body.id = id;
        return this.carsService.update(id, body);
    }

    @Delete(':id')
    // deleteCar(@Param('id', ParseIntPipe) id: number) {
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.delete(id);
    }
}
