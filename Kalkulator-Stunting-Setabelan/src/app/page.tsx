'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const WHO_STANDARDS = {
  male: {
    1: { height: { mean: 54.7, sd: 2.9 }, weight: { mean: 3.5, sd: 0.5 } },
    2: { height: { mean: 58.4, sd: 3.1 }, weight: { mean: 4.5, sd: 0.6 } },
    3: { height: { mean: 61.4, sd: 3.1 }, weight: { mean: 5.6, sd: 0.6 } },
    4: { height: { mean: 63.9, sd: 3.1 }, weight: { mean: 6.4, sd: 0.6 } },
    5: { height: { mean: 65.9, sd: 3.2 }, weight: { mean: 7.0, sd: 0.6 } },
    6: { height: { mean: 67.6, sd: 3.2 }, weight: { mean: 7.5, sd: 0.6 } },
    7: { height: { mean: 69.2, sd: 3.2 }, weight: { mean: 7.9, sd: 0.6 } },
    8: { height: { mean: 70.6, sd: 3.2 }, weight: { mean: 8.3, sd: 0.6 } },
    9: { height: { mean: 72.0, sd: 3.2 }, weight: { mean: 8.7, sd: 0.6 } },
    10: { height: { mean: 73.3, sd: 3.2 }, weight: { mean: 9.0, sd: 0.6 } },
    11: { height: { mean: 74.5, sd: 3.3 }, weight: { mean: 9.3, sd: 0.6 } },
    12: { height: { mean: 75.7, sd: 3.3 }, weight: { mean: 9.6, sd: 0.6 } },
    13: { height: { mean: 76.9, sd: 3.3 }, weight: { mean: 9.9, sd: 0.6 } },
    14: { height: { mean: 77.9, sd: 3.3 }, weight: { mean: 10.1, sd: 0.6 } },
    15: { height: { mean: 79.0, sd: 3.3 }, weight: { mean: 10.4, sd: 0.6 } },
    16: { height: { mean: 80.0, sd: 3.3 }, weight: { mean: 10.6, sd: 0.6 } },
    17: { height: { mean: 80.9, sd: 3.3 }, weight: { mean: 10.9, sd: 0.6 } },
    18: { height: { mean: 81.8, sd: 3.4 }, weight: { mean: 11.1, sd: 0.6 } },
    19: { height: { mean: 82.7, sd: 3.4 }, weight: { mean: 11.3, sd: 0.6 } },
    20: { height: { mean: 83.6, sd: 3.4 }, weight: { mean: 11.5, sd: 0.6 } },
    21: { height: { mean: 84.4, sd: 3.4 }, weight: { mean: 11.8, sd: 0.6 } },
    22: { height: { mean: 85.1, sd: 3.4 }, weight: { mean: 12.0, sd: 0.6 } },
    23: { height: { mean: 85.9, sd: 3.4 }, weight: { mean: 12.2, sd: 0.6 } },
    24: { height: { mean: 86.6, sd: 3.4 }, weight: { mean: 12.4, sd: 0.6 } },
    25: { height: { mean: 87.3, sd: 3.4 }, weight: { mean: 12.6, sd: 0.6 } },
    26: { height: { mean: 88.0, sd: 3.4 }, weight: { mean: 12.8, sd: 0.6 } },
    27: { height: { mean: 88.7, sd: 3.4 }, weight: { mean: 13.0, sd: 0.6 } },
    28: { height: { mean: 89.3, sd: 3.4 }, weight: { mean: 13.2, sd: 0.6 } },
    29: { height: { mean: 89.9, sd: 3.4 }, weight: { mean: 13.4, sd: 0.6 } },
    30: { height: { mean: 90.5, sd: 3.4 }, weight: { mean: 13.6, sd: 0.6 } },
    31: { height: { mean: 91.1, sd: 3.4 }, weight: { mean: 13.8, sd: 0.6 } },
    32: { height: { mean: 91.7, sd: 3.4 }, weight: { mean: 14.0, sd: 0.6 } },
    33: { height: { mean: 92.2, sd: 3.4 }, weight: { mean: 14.2, sd: 0.6 } },
    34: { height: { mean: 92.8, sd: 3.4 }, weight: { mean: 14.3, sd: 0.6 } },
    35: { height: { mean: 93.3, sd: 3.4 }, weight: { mean: 14.5, sd: 0.6 } },
    36: { height: { mean: 93.8, sd: 3.4 }, weight: { mean: 14.7, sd: 0.6 } },
    37: { height: { mean: 94.3, sd: 3.4 }, weight: { mean: 14.9, sd: 0.6 } },
    38: { height: { mean: 94.8, sd: 3.4 }, weight: { mean: 15.0, sd: 0.6 } },
    39: { height: { mean: 95.3, sd: 3.4 }, weight: { mean: 15.2, sd: 0.6 } },
    40: { height: { mean: 95.8, sd: 3.4 }, weight: { mean: 15.4, sd: 0.6 } },
    41: { height: { mean: 96.3, sd: 3.4 }, weight: { mean: 15.5, sd: 0.6 } },
    42: { height: { mean: 96.7, sd: 3.4 }, weight: { mean: 15.7, sd: 0.6 } },
    43: { height: { mean: 97.2, sd: 3.4 }, weight: { mean: 15.8, sd: 0.6 } },
    44: { height: { mean: 97.6, sd: 3.4 }, weight: { mean: 16.0, sd: 0.6 } },
    45: { height: { mean: 98.1, sd: 3.4 }, weight: { mean: 16.1, sd: 0.6 } },
    46: { height: { mean: 98.5, sd: 3.4 }, weight: { mean: 16.3, sd: 0.6 } },
    47: { height: { mean: 99.0, sd: 3.4 }, weight: { mean: 16.4, sd: 0.6 } },
    48: { height: { mean: 99.4, sd: 3.4 }, weight: { mean: 16.6, sd: 0.6 } },
    49: { height: { mean: 99.8, sd: 3.4 }, weight: { mean: 16.7, sd: 0.6 } },
    50: { height: { mean: 100.3, sd: 3.4 }, weight: { mean: 16.9, sd: 0.6 } },
    51: { height: { mean: 100.7, sd: 3.4 }, weight: { mean: 17.0, sd: 0.6 } },
    52: { height: { mean: 101.1, sd: 3.4 }, weight: { mean: 17.2, sd: 0.6 } },
    53: { height: { mean: 101.5, sd: 3.4 }, weight: { mean: 17.3, sd: 0.6 } },
    54: { height: { mean: 101.9, sd: 3.4 }, weight: { mean: 17.5, sd: 0.6 } },
    55: { height: { mean: 102.3, sd: 3.4 }, weight: { mean: 17.6, sd: 0.6 } },
    56: { height: { mean: 102.7, sd: 3.4 }, weight: { mean: 17.8, sd: 0.6 } },
    57: { height: { mean: 103.1, sd: 3.4 }, weight: { mean: 17.9, sd: 0.6 } },
    58: { height: { mean: 103.5, sd: 3.4 }, weight: { mean: 18.1, sd: 0.6 } },
    59: { height: { mean: 103.9, sd: 3.4 }, weight: { mean: 18.2, sd: 0.6 } },
    60: { height: { mean: 104.3, sd: 3.4 }, weight: { mean: 18.4, sd: 0.6 } }
  },
  female: {
    1: { height: { mean: 53.7, sd: 2.8 }, weight: { mean: 3.4, sd: 0.5 } },
    2: { height: { mean: 57.1, sd: 3.0 }, weight: { mean: 4.2, sd: 0.5 } },
    3: { height: { mean: 59.8, sd: 2.9 }, weight: { mean: 5.1, sd: 0.5 } },
    4: { height: { mean: 62.1, sd: 2.9 }, weight: { mean: 5.8, sd: 0.5 } },
    5: { height: { mean: 64.0, sd: 2.9 }, weight: { mean: 6.4, sd: 0.5 } },
    6: { height: { mean: 65.7, sd: 2.9 }, weight: { mean: 6.9, sd: 0.5 } },
    7: { height: { mean: 67.3, sd: 2.9 }, weight: { mean: 7.3, sd: 0.5 } },
    8: { height: { mean: 68.7, sd: 2.9 }, weight: { mean: 7.7, sd: 0.5 } },
    9: { height: { mean: 70.1, sd: 2.9 }, weight: { mean: 8.0, sd: 0.5 } },
    10: { height: { mean: 71.5, sd: 2.9 }, weight: { mean: 8.3, sd: 0.5 } },
    11: { height: { mean: 72.8, sd: 2.9 }, weight: { mean: 8.6, sd: 0.5 } },
    12: { height: { mean: 74.0, sd: 2.9 }, weight: { mean: 8.9, sd: 0.5 } },
    13: { height: { mean: 75.2, sd: 2.9 }, weight: { mean: 9.2, sd: 0.5 } },
    14: { height: { mean: 76.4, sd: 2.9 }, weight: { mean: 9.5, sd: 0.5 } },
    15: { height: { mean: 77.5, sd: 2.9 }, weight: { mean: 9.7, sd: 0.5 } },
    16: { height: { mean: 78.6, sd: 2.9 }, weight: { mean: 10.0, sd: 0.5 } },
    17: { height: { mean: 79.7, sd: 2.9 }, weight: { mean: 10.2, sd: 0.5 } },
    18: { height: { mean: 80.7, sd: 2.9 }, weight: { mean: 10.4, sd: 0.5 } },
    19: { height: { mean: 81.7, sd: 2.9 }, weight: { mean: 10.7, sd: 0.5 } },
    20: { height: { mean: 82.7, sd: 2.9 }, weight: { mean: 10.9, sd: 0.5 } },
    21: { height: { mean: 83.7, sd: 2.9 }, weight: { mean: 11.1, sd: 0.5 } },
    22: { height: { mean: 84.6, sd: 2.9 }, weight: { mean: 11.3, sd: 0.5 } },
    23: { height: { mean: 85.5, sd: 2.9 }, weight: { mean: 11.5, sd: 0.5 } },
    24: { height: { mean: 86.4, sd: 2.9 }, weight: { mean: 11.8, sd: 0.5 } },
    25: { height: { mean: 87.2, sd: 2.9 }, weight: { mean: 12.0, sd: 0.5 } },
    26: { height: { mean: 88.0, sd: 2.9 }, weight: { mean: 12.2, sd: 0.5 } },
    27: { height: { mean: 88.8, sd: 2.9 }, weight: { mean: 12.4, sd: 0.5 } },
    28: { height: { mean: 89.6, sd: 2.9 }, weight: { mean: 12.6, sd: 0.5 } },
    29: { height: { mean: 90.4, sd: 2.9 }, weight: { mean: 12.8, sd: 0.5 } },
    30: { height: { mean: 91.2, sd: 2.9 }, weight: { mean: 13.0, sd: 0.5 } },
    31: { height: { mean: 91.9, sd: 2.9 }, weight: { mean: 13.2, sd: 0.5 } },
    32: { height: { mean: 92.6, sd: 2.9 }, weight: { mean: 13.4, sd: 0.5 } },
    33: { height: { mean: 93.4, sd: 2.9 }, weight: { mean: 13.6, sd: 0.5 } },
    34: { height: { mean: 94.1, sd: 2.9 }, weight: { mean: 13.8, sd: 0.5 } },
    35: { height: { mean: 94.8, sd: 2.9 }, weight: { mean: 14.0, sd: 0.5 } },
    36: { height: { mean: 95.4, sd: 2.9 }, weight: { mean: 14.2, sd: 0.5 } },
    37: { height: { mean: 96.1, sd: 2.9 }, weight: { mean: 14.4, sd: 0.5 } },
    38: { height: { mean: 96.7, sd: 2.9 }, weight: { mean: 14.5, sd: 0.5 } },
    39: { height: { mean: 97.3, sd: 2.9 }, weight: { mean: 14.7, sd: 0.5 } },
    40: { height: { mean: 97.9, sd: 2.9 }, weight: { mean: 14.9, sd: 0.5 } },
    41: { height: { mean: 98.5, sd: 2.9 }, weight: { mean: 15.1, sd: 0.5 } },
    42: { height: { mean: 99.1, sd: 2.9 }, weight: { mean: 15.2, sd: 0.5 } },
    43: { height: { mean: 99.7, sd: 2.9 }, weight: { mean: 15.4, sd: 0.5 } },
    44: { height: { mean: 100.3, sd: 2.9 }, weight: { mean: 15.6, sd: 0.5 } },
    45: { height: { mean: 100.8, sd: 2.9 }, weight: { mean: 15.7, sd: 0.5 } },
    46: { height: { mean: 101.4, sd: 2.9 }, weight: { mean: 15.9, sd: 0.5 } },
    47: { height: { mean: 101.9, sd: 2.9 }, weight: { mean: 16.1, sd: 0.5 } },
    48: { height: { mean: 102.4, sd: 2.9 }, weight: { mean: 16.2, sd: 0.5 } },
    49: { height: { mean: 102.9, sd: 2.9 }, weight: { mean: 16.4, sd: 0.5 } },
    50: { height: { mean: 103.4, sd: 2.9 }, weight: { mean: 16.6, sd: 0.5 } },
    51: { height: { mean: 103.9, sd: 2.9 }, weight: { mean: 16.7, sd: 0.5 } },
    52: { height: { mean: 104.4, sd: 2.9 }, weight: { mean: 16.9, sd: 0.5 } },
    53: { height: { mean: 104.9, sd: 2.9 }, weight: { mean: 17.0, sd: 0.5 } },
    54: { height: { mean: 105.4, sd: 2.9 }, weight: { mean: 17.2, sd: 0.5 } },
    55: { height: { mean: 105.8, sd: 2.9 }, weight: { mean: 17.3, sd: 0.5 } },
    56: { height: { mean: 106.3, sd: 2.9 }, weight: { mean: 17.5, sd: 0.5 } },
    57: { height: { mean: 106.7, sd: 2.9 }, weight: { mean: 17.6, sd: 0.5 } },
    58: { height: { mean: 107.2, sd: 2.9 }, weight: { mean: 17.8, sd: 0.5 } },
    59: { height: { mean: 107.6, sd: 2.9 }, weight: { mean: 17.9, sd: 0.5 } },
    60: { height: { mean: 108.1, sd: 2.9 }, weight: { mean: 18.1, sd: 0.5 } }
  }
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Nama harus diisi setidaknya dua karakter.',
  }),
  height: z.string()
    .nonempty({ message: 'Tinggi wajib diisi.' })
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 30 && num <= 200;
    }, {
      message: 'Tinggi minimal setidaknya 30cm dan maksimal 200cm.',
    })
    .transform((val) => parseFloat(val)),
  weight: z.string()
    .nonempty({ message: 'Berat wajib diisi.' })
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 1 && num <= 50;
    }, {
      message: 'Berat minimal setidaknya 1kg dan maksimal 50kg.',
    })
    .transform((val) => parseFloat(val)),
  age: z.string()
    .nonempty({ message: 'Usia wajib diisi.' })
    .refine((val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num >= 1 && num <= 60;
    }, {
      message: 'Usia minimal setidaknya 1 bulan dan maksimal 60 bulan (5 tahun).',
    })
    .transform((val) => parseInt(val, 10)),
  gender: z.enum(['male', 'female']),
});

interface FormData {
  name: string;
  height: string;
  weight: string;
  age: string;
  gender: 'male' | 'female';
}

const calculateZScore = (value: number, mean: number, sd: number) => {
  return (value - mean) / sd;
};

const StuntingChecker = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState<{
    zScoreHeight: number;
    zScoreWeight: number;
    isStunting: boolean;
  } | null>(null);

  const [results, setResults] = useState<{
    height: { mean: number; sd: number };
    weight: { mean: number; sd: number };
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      height: '',
      weight: '',
      age: '',
      gender: 'male',
    },
  });

  const { handleSubmit, control } = formMethods;

  const onSubmit = (data: FormData) => {
    try {
      const { name, height, weight, age, gender } = data;
      setName(name); // Save name in state

      const numericAge = parseInt(age, 10);
      if (isNaN(numericAge)) {
        throw new Error('Age must be a valid number.');
      }

      const standard = WHO_STANDARDS[gender][numericAge as keyof typeof WHO_STANDARDS['male']];
      if (!standard) {
        throw new Error('Data yang diisi tidak valid!');
      }

      const zScoreHeight = calculateZScore(parseFloat(height), standard.height.mean, standard.height.sd);
      const zScoreWeight = calculateZScore(parseFloat(weight), standard.weight.mean, standard.weight.sd);
      const isStunting = zScoreHeight < -2 || zScoreWeight < -2;

      setResults({ height: standard.height, weight: standard.weight }); // Set results state
      setResult({ zScoreHeight, zScoreWeight, isStunting });
      setIsModalOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-4/5 p-10">
      <Card className="sm:p-10 w-full sm:w-4/5">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="yellow text-center">Kalkulator Stunting Setabelan</CardTitle>
          <CardDescription className="text-center">Menghitung z-score untuk mendeteksi kemungkinan stunting</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tinggi (cm)</FormLabel>
                    <FormControl>
                      <Input placeholder="Tinggi (cm)" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Berat (kg)</FormLabel>
                    <FormControl>
                      <Input placeholder="Berat (kg)" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usia (bulan)</FormLabel>
                    <FormControl>
                      <Input placeholder="Usia (bulan)" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-y-6 justify-center items-center w-full">
                <FormField
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full" variant="outline">Jenis Kelamin</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Jenis kelamin</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <DropdownMenuRadioItem value="male">
                            Laki-laki
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="female">
                            Perempuan
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                />
                <Button className="w-full" type="submit">Submit</Button>
              </div>
            </form>
          </Form>

          {isModalOpen && (
            <div
              id="default-modal"
              tabIndex={-1}
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
            >
              <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Hasil cek {name}
                  </h3>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6-6M7 7l-6 6m6-6l6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-6 space-y-6">
                  <p className="text-base leading-relaxed text-gray-700 dark:text-gray-400">
                    Z-Score Tinggi: {result?.zScoreHeight.toFixed(2)}
                  </p>
                  <p className="text-base leading-relaxed text-gray-700 dark:text-gray-400">
                    Z-Score Berat: {result?.zScoreWeight.toFixed(2)}
                  </p>
                  {results && (
                    <>
                      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-400">
                        Tinggi ideal: {results.height.mean} cm
                      </p>
                      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-400">
                        Berat ideal: {results.weight.mean} kg
                      </p>
                    </>
                  )}
                  <p className="text-base leading-relaxed text-gray-700 dark:text-gray-400">
                    Status: {result?.isStunting ? 'Stunting' : 'Tidak Stunting'}
                  </p>
                </div>
                <div className="flex justify-end items-center p-4 md:p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <Button onClick={closeModal}>Tutup</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className='flex justify-center items-center'>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            *Data dan hasil yang ditampikan berdasarkan standar WHO.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StuntingChecker;
