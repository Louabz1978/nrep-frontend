import Joi from "joi";

// status step -----------------------------------------------------------
export const statusStepSchema = Joi.object({});

export type StatusStepType = {};

export const statusStepInitialValues = {};

// general step -----------------------------------------------------------
export const generalStepSchema = Joi.object({});

export type GeneralStepType = {};

export const generalStepInitialValues = {};

// rooms step -----------------------------------------------------------
export const roomsStepSchema = Joi.object({});

export type RoomsStepType = typeof roomsStepSchema;

export const roomsStepInitialValues = {};

// features step -----------------------------------------------------------
export const featuresStepSchema = Joi.object({});

export type FeaturesStepType = typeof featuresStepSchema;

export const featuresStepInitialValues = {};

// financial step -----------------------------------------------------------
export const financialStepSchema = Joi.object({});

export type FinancialStepType = typeof financialStepSchema;

export const financialStepInitialValues = {};

// compensation step -----------------------------------------------------------
export const compensationStepSchema = Joi.object({});

export type CompensationStepType = typeof compensationStepSchema;

export const compensationStepInitialValues = {};

// offices step -----------------------------------------------------------
export const officesStepSchema = Joi.object({});

export type OfficesStepType = typeof officesStepSchema;

export const officesStepInitialValues = {};

// remarks step -----------------------------------------------------------
export const remarksStepSchema = Joi.object({});

export type RemarksStepType = typeof remarksStepSchema;

export const remarksStepInitialValues = {};
