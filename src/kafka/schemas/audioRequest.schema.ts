import {
    IsString,
    IsNotEmpty,
    IsPositive,
    IsNumber,
    IsBoolean,
    ValidateNested,
    ArrayNotEmpty,
} from 'class-validator';

class Question {
    @IsString()
    @IsNotEmpty()
    question: string;
  
    @IsString()
    @IsNotEmpty()
    answer: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    id : number; // Input que respondio, en el front esto corresponde a un radio button

    @IsBoolean()
    @IsNotEmpty()
    templateHandler: boolean;
}

class AudioMotive {
    @IsString()
    @IsNotEmpty()
    voice : string;

    @IsString()
    @IsNotEmpty()
    export : string;

    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    questions: Question[];
}



class UserData {
    @IsString()
    @IsNotEmpty()
    names: string;

    @IsString()
    @IsNotEmpty()
    lastnames: string;

    @IsString()
    @IsNotEmpty()
    wantToBeCalled: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsString()
    @IsNotEmpty()
    birthdate: string;
    // * Anda saber si matias despues quiere que en el cumple de una persona, el template deba ser diferente
}



class ExportSections {
    @IsNumber()
    @IsNotEmpty()
    timeStart: number;

    @IsNumber()
    @IsNotEmpty()
    timeEnd: number;
}

class ExportSettings {

    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    sections : ExportSections[];

    @IsString()
    @IsNotEmpty()
    audioImg: string;
}

class TemplateSettings {
    @IsString()
    @IsNotEmpty()
    templates: string;
}

class Settings {
    @ValidateNested()
    exportSettings : ExportSettings;

    @ValidateNested()
    templateSettings : TemplateSettings;

    @IsString()
    @IsNotEmpty()
    userLevel: string;
}



export class PureAudioRequest {
    @IsString()
    @IsNotEmpty()
    userId: string;
  
    @IsString()
    requestDate: string;
  
    @IsString()
    membershipDate: string;

    @ValidateNested()
    audioMotive: AudioMotive;
  
    @ValidateNested()
    userData: UserData;

    @ValidateNested()
    settings: Settings;
}

class ExportSettingsFinal extends ExportSettings {
    @IsString()
    @IsNotEmpty()
    path: string;
}

export class AudioRequest extends PureAudioRequest {
    
    @ValidateNested()
    exportSettings: ExportSettingsFinal;

}