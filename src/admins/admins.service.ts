import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from './dto/login-admin.dt';

let newAdmin:any
@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
  ) { }

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminRepo.findOne({ where: { phone: createAdminDto.phone } });
    if (admin) {
      throw new BadRequestException('Phone already exists!');
    }
    
    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    newAdmin = {...createAdminDto, hashed_password: hashed_password, role: "ADMIN" }

    const newConfirAdmin = await this.adminRepo.create({
      ...newAdmin
    })

    const tokens = await this.getTokens(
      newConfirAdmin
    )
    
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    
    const updatedAdmin = await this.adminRepo.update({
      hashed_refresh_token: hashed_refresh_token,
    },
      { where: { id: newConfirAdmin.id }, returning: true },)

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin Registred',
      admin: updatedAdmin[1][0],
      tokens,
    };
    return response;
  }


  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException('Admin not registered');
    }
    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Password error');
    }
    const tokens = await this.getTokens(admin)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: admin.id }, returning: true },)

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin logged in',
      admin: updatedAdmin[1][0],
      tokens,
    }
    return response;
  }


  async logout(refreshToken: string, res: Response) {
    const admin = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    })
    if (!admin) {
      throw new ForbiddenException('Admin not found');
    }
    const updatedAdmin = await this.adminRepo.update(
      { hashed_refresh_token: null },
      { where: { id: admin.id }, returning: true },
    )
    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      admin: updatedAdmin[1][0],
    }
    return response;

  }


  async getAllAdmin() {
    const adminies = await this.adminRepo.findAll({ include: { all: true } });
    return adminies;
  }


  async getOneAdmin(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findByPk(id);
    return admin;
  }


  async delOneAdmin(id: number) {
    return this.adminRepo.destroy({ where: { id } });
  }


  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.update(updateAdminDto, {
      where: { id },
    })
  }


  async refreshToken(admin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (admin_id != decodedToken['id']) {
      throw new BadRequestException('Admin not found!');
    }
    const admin = await this.adminRepo.findOne({ where: { id: admin_id } });
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('ADmin not found!');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(admin)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: admin.id }, returning: true },)

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin logged in',
      admin: updatedAdmin[1][0],
      tokens,
    }
    return response;
  }


  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      email: admin.email,
      phone: admin.phone,
      role: admin.role,
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      })
    ])
    return {
      access_tokken: accessToken,
      refresh_token: refreshToken,
    };
  }
}