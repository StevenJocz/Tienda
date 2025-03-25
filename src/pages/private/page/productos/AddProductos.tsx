import './Productos.css'
import { IonIcon } from '@ionic/react';
import { Alert, Button, Checkbox, MenuItem, Snackbar, Switch, Tooltip, SelectChangeEvent, Select, ListItemText, InputLabel, Box, OutlinedInput, Chip } from '@mui/material';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { useTheme } from '@mui/material/styles';
import { saveOutline, closeOutline, paperPlaneOutline, arrowBackOutline, helpCircleOutline, imageOutline, bodyOutline, cloudUploadOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { MenuProps, StyledFormControl, StyledTextField, getStyles } from '../../../../utilities/SelectProps';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AddProducto, ImagenData, InventarioSION, Talla } from '../../../../models/Productos';
import { Table } from '../../dashboard/components/table';
import { Categoria } from '../../../../models/categoria';
import { api } from '../../../../services';
import { Tag } from '../../../../models/tag';
import dayjs from 'dayjs';

interface Props {
  mostrarRegistro: () => void;
  actualizarDatos?: () => void;
  idProducto: number;
}

const AddProductos: React.FC<Props> = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [msg, setMsg] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [producto, setProducto] = useState<AddProducto>();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const theme = useTheme();
  const [Tallas, setTalla] = useState<Talla[]>([]);
  const [porcentajeTalla, setPorcentajeTalla] = useState('');
  const [nombreTalla, setNombreTalla] = useState('');
  const [verAddImagen, setVerAddImagen] = useState(false);
  const [idInventario, setIdInventario] = useState(0);
  const [inventario, setInventario] = useState<InventarioSION[] | null>(null);
  const [categoria, setCategoria] = useState<Categoria[] | null>(null);
  const [tag, setTag] = useState<Tag[] | null>(null);
  const [precioBase, setPrecioBase] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedImageBase64, setSelectedImageBase64] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const mainContainer = document.getElementById('main');
    if (mainContainer) {
      mainContainer.scrollTop = 0;
      
    }
  }, []);

  useEffect(() => {
    hadleGetCategorias();
    hadleGetTag();
    hadleGetInventarioSion();
    if (props.idProducto > 0) {
      hadleGet();
    }
  }, []);

  const hadleGetCategorias = async () => {
    // Solicitud GET
    await api.get<any>('Categoria/Get_Categoria', { accion: 2 }).then((response) => {
      setCategoria(response.data);
    });
  };

  const hadleGetTag = async () => {
    // Solicitud GET
    await api.get<any>('tag/Get_Tag', { accion: 2 }).then((response) => {
      setTag(response.data);
    });
  };

  const hadleGetInventarioSion = async () => {
    // Solicitud GET
    await api.get<any>('Producto/Get_Inventario').then((response) => {
      setInventario(response.data);
    });
  };


  const hadleGetIdInventarioSion = async (idInventario: number) => {
    // Solicitud GET
    await api.get<any>('Producto/Get_Id_Inventario', { idInventario: idInventario }).then((response) => {
      setPrecioBase(response.data[0].precio);
    });
  };

  const haddleInventario = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setIdInventario(parseInt(selectedValue));
    if (selectedValue !== '0') {
      await hadleGetIdInventarioSion(Number(selectedValue));
    }
  };

  const hadleGet = async () => {
    try {
      const response = await api.get<AddProducto[]>('Producto/Get_Id_Producto', { idProducto: props.idProducto });
      if (response.data.length > 0) {
        setProducto({
          id: response.data[0].id,
          idInventario: response.data[0].idInventario,
          idCategoria: response.data[0].idCategoria,
          nombre: response.data[0].nombre,
          descripcion: response.data[0].descripcion,
          informacion: response.data[0].informacion,
          tags: response.data[0].tags,
          descuento: response.data[0].descuento,
          fechaFinDescuento: response.data[0].fechaFinDescuento,
          idTercero: response.data[0].idTercero,
          activo: response.data[0].activo,
          imagenes: response.data[0].imagenes,
          tallas: response.data[0].tallas,

        });
        setIdInventario(response.data[0].idInventario);
        hadleGetIdInventarioSion(response.data[0].idInventario);
        setJsonImagenes(response.data[0].imagenes as ImagenData[]);
        setTalla(response.data[0].tallas as Talla[]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedValues(event.target.value as string[]);
  };

  const handleTalla = () => {
    const exists = Tallas.some((talla) => talla.nombre === nombreTalla);
    if (exists) {
      alert('Ya existe una talla con ese nombre');
      return;
    }
    if (nombreTalla == '') {
      alert('Por favor, seleccione la talla');
      return;
    }

    const maxId = Tallas.length > 0 ? Math.max(...Tallas.map(talla => talla.id)) : 0;
    const porcentajeDescuento = porcentajeTalla == '' ? parseFloat('0') : parseFloat(porcentajeTalla);
    const descuento = precioBase * (porcentajeDescuento / 100);
    const precioFinal = precioBase + descuento;

    const objTalla: Talla = {
      id: maxId + 1,
      nombre: nombreTalla,
      porcentaje: porcentajeTalla || '0',
      valor: precioFinal
    }
    setTalla([...Tallas, objTalla])
    setPorcentajeTalla('0');
    setNombreTalla('');
  };

  const handleDeleteTalla = (id: number) => {
    const updatedTallas = Tallas.filter(talla => talla.id !== id);
    setTalla(updatedTallas);
  }

  const handleVerAddImagen = () => {
    setVerAddImagen(!verAddImagen);
  }

  const handleTextareaDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      if (imageFiles.length > 0) {
        const imageUrl = URL.createObjectURL(imageFiles[0]);
        setSelectedImage(imageUrl);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            const base64Image = e.target.result as string;
            setSelectedImageBase64(base64Image);
          }
        };
        reader.readAsDataURL(files[0]);
      }
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setSelectedImage(imageUrl);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const base64Image = e.target.result as string;
          setSelectedImageBase64(base64Image);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClickImagen = () => {
    fileInputRef.current?.click();
  };

  const [jsonImagenes, setJsonImagenes] = useState<ImagenData[]>([]);
  const [currentImagen, setCurrentImagen] = useState({
    nombreImagen: '',
    nombreColor: '',
    color: '',
    porcentajeValor: ''
  });

  const handleChangeImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentImagen(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveImagen = () => {
    const maxId = jsonImagenes.length > 0 ? Math.max(...jsonImagenes.map(imagen => imagen.id)) : 0;
    const newImage: ImagenData = {
      id: maxId + 1,
      imagen: selectedImageBase64,
      nombreImagen: currentImagen.nombreImagen,
      nombreColor: currentImagen.nombreColor,
      color: currentImagen.color,
      porcentajeValor: currentImagen.porcentajeValor,
      actualizar: false
    };

    setJsonImagenes([...jsonImagenes, newImage]);


    // Reset current image data
    setCurrentImagen({
      nombreImagen: '',
      nombreColor: '',
      color: '',
      porcentajeValor: ''
    });
    setSelectedImage('');
    setSelectedImageBase64('');
  };

  const handleDeleteImagen = (id: number) => {
    const updatedImagen = jsonImagenes.filter(imagen => imagen.id !== id);
    setJsonImagenes(updatedImagen);
  }

  const handleClick = () => {
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };

  const handleRegistrar = async (values: FormikValues) => {
    setIsSubmitting(true);
    try {
      const Addproducto: AddProducto = {
        id: props.idProducto,
        idInventario: idInventario,
        idCategoria: parseInt(values.idCategoria),
        nombre: values.nombre,
        descripcion: values.descripcion,
        informacion: values.informacion,
        tags: selectedValues.toString(),
        descuento:  values.porcentajeDescuento === "" ? 0 : values.porcentajeDescuento,
        fechaFinDescuento: values.fechaDescuento == null ? "2000-01-01T00:00:00.514Z" : values.fechaDescuento,
        idTercero: 42066,
        activo: values.activo,
        imagenes: jsonImagenes,
        tallas: Tallas,
      };

      // console.log(Addproducto)
      // setIsSubmitting(false)

      if (props.idProducto > 0) {
        console.log(Addproducto);
        await api.put<any>('Producto/Put_Actualizar_Producto', Addproducto);

      } else {
        await api.post<any>('Producto/Post_Crear_Producto', Addproducto);
      }
      setOpenSnackbar(true);
      setMsg('');

    } catch (error) {
      setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);

    setIsSubmitting(false);
    if (props.actualizarDatos) {
      props.actualizarDatos();
    }
    props.mostrarRegistro();
  };

  return (
    <div className='AddProductos'>
      <div className='AddProductos_Encabezado'>
        {props.idProducto == 0 ? (
          <h3> Crear producto</h3>
        ) : (
          <h3> Actualizar producto</h3>
        )}
        <div>
          {props.idProducto == 0 ? (
            <Button
              onClick={props.mostrarRegistro}
              variant="outlined"
              size="small"
              startIcon={<IonIcon className='' icon={closeOutline} />}
            >
              Cancelar
            </Button>
          ) : (
            <Button
              onClick={props.mostrarRegistro}
              variant="outlined"
              size="small"
              startIcon={<IonIcon className='' icon={arrowBackOutline} />}
            >
              Volver a la lista
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            size="small"
            startIcon={isSubmitting == true ? (<IonIcon className='' icon={paperPlaneOutline} />) : (<IonIcon className='' icon={saveOutline} />)}
            disabled={isSubmitting}
            onClick={handleClick}
          >
            {props.idProducto == 0 ? (
              isSubmitting == true ? ('Registrando...') : ('Registrar')
            ) : (
              isSubmitting == true ? ('Actualizando...') : ('Actualizar')
            )}
          </Button>
        </div>
      </div>
      <div className='AddProductos_Body'>
        <Formik
          enableReinitialize={true}
          initialValues={{
            id: props.idProducto,
            idInventario: idInventario || '',
            activo: producto?.activo || true,
            nombre: producto?.nombre || '',
            descripcion: producto?.descripcion || '0',
            informacion: producto?.informacion || '',
            preciobase: precioBase,
            porcentajeDescuento: producto?.descuento.toString() || '',
            precioFinal: '',
            fechaDescuento: producto?.fechaFinDescuento ? dayjs(producto?.fechaFinDescuento) : null,
            idCategoria: producto?.idCategoria || '',

          }}
          validate={(valor) => {

            let errors: any = {};

            if (!valor.nombre) {
              errors.nombre = 'Campo Obligatorio';
            }

            if (!valor.descripcion) {
              errors.descripcion = 'Campo Obligatorio';
            }
            if (!valor.idCategoria) {
              errors.idCategoria = 'Campo Obligatorio';
            }

            return errors;
          }}
          onSubmit={handleRegistrar}
        >
          {({ errors, values, setFieldValue }) => {

            useEffect(() => {
              const calculatePrecioFinal = () => {
                const precioBase = values.preciobase || 0;
                const porcentajeDescuento = parseFloat(values.porcentajeDescuento) || 0;
                const descuento = precioBase * (porcentajeDescuento / 100);
                const precioFinal = precioBase - descuento;
                setFieldValue('precioFinal', precioFinal.toFixed(0));
              };

              calculatePrecioFinal();
            }, [values.preciobase, values.porcentajeDescuento, setFieldValue]);

            return (
              <Form>
                <div className='AddProductos_Formulario'>
                  <div className='AddProductos_Formulario_left'>
                    <div className='AddProductos_Formulario_input'>
                      <StyledTextField
                        id="outlined-select-currency"
                        select
                        label="Seleccione inventario de SION"
                        size="small"
                        variant="outlined"
                        value={values.idInventario}
                        onChange={haddleInventario}
                      >
                        <MenuItem value={'0'}>
                          Seleccione
                        </MenuItem>

                        {inventario && inventario.map((option) => (
                          <MenuItem key={option.idInventario} value={option.idInventario}>
                            {option.codigo + ' - ' + option.nombre}
                          </MenuItem>
                        ))}
                      </StyledTextField>
                      <ErrorMessage name='idInventario' component={() => <p className='Error'>{errors.idInventario}</p>} />
                    </div>
                    <div className='AddProductos_Formulario_input'>
                      <StyledTextField
                        name='titulo'
                        label="Nombre del producto"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        placeholder='Introduce el nombre del producto'
                        value={values.nombre}
                        onChange={(e) => setFieldValue('nombre', e.target.value)}
                      />
                      <ErrorMessage name='nombre' component={() => <p className='Error'>{errors.nombre}</p>} />
                    </div>
                    <div className='AddProductos_Formulario_input'>
                      <StyledTextField
                        name='titulo'
                        label="Descripción del producto"
                        variant="outlined"
                        size="small"
                        multiline
                        rows={6}
                        color="secondary"
                        placeholder="Escribe una breve descripción del producto aquí..."
                        value={values.descripcion}
                        onChange={(e) => setFieldValue('descripcion', e.target.value)}
                      />
                      <ErrorMessage name='descripcionCorta' component={() => <p className='Error'>{errors.descripcion}</p>} />
                    </div>
                    <div className="AddProductos_Formulario_input">
                      <h4>Información del producto</h4>
                      <Editor
                        value={values.informacion}
                        onEditorChange={(content) => setFieldValue('informacion', content)}
                        apiKey='bwo0pi4uyss3z9mhpqjesq2su8wxh5jsn2el6l1eohqiwwho'
                        init={{
                          height: 350,
                          content_style: "font-size: 16px; font-family: 'Roboto', sans-serif;",
                          menubar: false,
                          plugins: [
                            'lists'
                          ],
                          toolbar: 'undo redo formatselect bold italic underline strikethrough alignleft aligncenter alignright bullist'
                        }}
                      />
                    </div>
                    <div className='AddProductos_Formulario_input'>
                      <h4>Imagenes</h4>
                      <div className='AddCursos_Formulario-imagenes'>
                        {verAddImagen ? (
                          <div className='AddCursos_Formulario-imagenes--add'>
                            <div className='Formulario-imagenes--add--cerrar'>
                              <IonIcon className='icono' icon={closeOutline} onClick={handleVerAddImagen} />
                            </div>
                            <div className='Formulario-imagenes--add--body'>
                              <h4>Add imagen</h4>
                              <div className='AddProductos_Formulario_input'>
                                <StyledTextField
                                  name='nombreImagen'
                                  label="Nombre de la imagen"
                                  variant="outlined"
                                  size="small"
                                  color="secondary"
                                  placeholder='Introduce el nombre de la imagen'
                                  value={currentImagen.nombreImagen}
                                  onChange={handleChangeImagen}
                                />
                              </div>
                              <div className='AddImagenes_Formulario_input'>
                                <div className='AddProductos_Formulario_input'>
                                  <StyledTextField
                                    name='nombreColor'
                                    label="Nombre color"
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    placeholder='Introduce el nombre del color'
                                    value={currentImagen.nombreColor}
                                    onChange={handleChangeImagen}
                                  />
                                </div>
                                <div className='AddProductos_Formulario_input'>
                                  <StyledTextField
                                    name='color'
                                    type='color'
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    value={currentImagen.color}
                                    onChange={handleChangeImagen}
                                  />
                                </div>
                                <div className='AddProductos_Formulario_input'>
                                  <StyledTextField
                                    name='porcentajeValor'
                                    label="Porcentaje más de valor"
                                    variant="outlined"
                                    size="small"
                                    color="secondary"
                                    placeholder='0'
                                    type='number'
                                    value={currentImagen.porcentajeValor}
                                    onChange={handleChangeImagen}
                                  />
                                </div>
                              </div>
                              <div className='AddImagenes_Formulario_input'>
                                <div
                                  className={`AddImagenes_Formulario--dropzone ${isDragging ? 'dragging' : ''}`}
                                  onDrop={handleTextareaDrop}
                                  onDragOver={(e) => e.preventDefault()}
                                  onDragEnter={handleDragEnter}
                                  onDragLeave={handleDragLeave}
                                  onClick={handleClickImagen}
                                >
                                  <IonIcon className='icono' icon={cloudUploadOutline} />
                                  <p>Arrastra una imagen aquí o</p>
                                  <span>Selecciona</span>
                                  <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                  />
                                </div>
                              </div>
                              <div className='AddImagenes_Formulario_input--imagen'>
                                {selectedImage && (
                                  <>
                                    <img src={selectedImage} alt="selected" />
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      startIcon={<IonIcon icon={saveOutline} />}
                                      onClick={handleSaveImagen}
                                    >
                                      Guardar imagen
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className='AddCursos_Formulario-imagenes--texto'>
                            <p>Por favor, ten en cuenta que las dos primeras imágenes que agregues serán las que se mostrarán inicialmente en las tarjetas. Asegúrate de seleccionar cuidadosamente estas imágenes para dar una buena primera impresión a los usuarios.</p>
                          </div>

                        )
                        }
                        <div className='AddCursos_Formulario-imagenes-encabezado'>
                          <Button
                            variant="outlined"
                            size="small"
                            color="success"
                            startIcon={<IonIcon className='' icon={imageOutline} />}
                            onClick={handleVerAddImagen}
                          >
                            Agregar imagenes

                          </Button>
                          <Tooltip
                            title="Por favor, ten en cuenta que las dos primeras imágenes que agregues serán las que se mostrarán inicialmente en las tarjetas. Asegúrate de seleccionar cuidadosamente estas imágenes para dar una buena primera impresión a los usuarios."
                            placement="left"
                            disableInteractive
                          >
                            <IonIcon className='icono' icon={helpCircleOutline} />
                          </Tooltip>
                        </div>
                        <div>

                          {jsonImagenes.length > 0 && (
                            <Table
                              data={jsonImagenes}
                              verBotonEliminar={true}
                              eliminarRegistro={handleDeleteImagen}
                            />)}
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className='AddProductos_Formulario_right'>
                    <div className='AddCursos_Formulario-content'>
                      <div className='AddProductos_Formulario_input'>
                        <Switch
                          checked={values.activo}
                          onChange={() => setFieldValue('activo', !values.activo)}
                          color="secondary"
                        />
                        <label className={values.activo ? 'Activo' : ''}>{values.activo ? 'Activo' : 'Inactivo'}</label>

                      </div>
                    </div>
                    <div className='AddCursos_Formulario-content'>
                      <h4>Organizar</h4>
                      <div className="AddProductos_Formulario_input">
                        <StyledTextField
                          id="outlined-select-currency"
                          select
                          label="Seleccione Categoria"
                          size="small"
                          variant="outlined"
                          value={values.idCategoria}
                          onChange={(e) => setFieldValue('idCategoria', e.target.value)}
                        >
                          <MenuItem value={0}>
                            Seleccione
                          </MenuItem>

                          {categoria && categoria.map((option) => (
                            <MenuItem key={option.idCategoria} value={option.idCategoria}>
                              {option.nombre}
                            </MenuItem>
                          ))}
                        </StyledTextField>

                      </div>
                      <div className="AddProductos_Formulario_input">
                        <StyledFormControl variant="outlined" size="small">
                          <InputLabel id="multi-select-label">Seleccionar tag</InputLabel>
                          <Select
                            labelId="multi-select-label"
                            id="multi-select"
                            multiple
                            value={selectedValues}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Agregue tab" />}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  <Chip key={value} label={tag && tag.find(option => option.idTag === Number(value))?.tag} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {tag && tag.map((option) => (
                              <MenuItem
                                key={option.idTag}
                                value={option.idTag}
                                style={getStyles(option.tag, selectedValues, theme)}
                              >
                                <Checkbox checked={selectedValues.indexOf(option.tag) > -1} />
                                <ListItemText primary={option.tag} />
                              </MenuItem>
                            ))}
                          </Select>
                        </StyledFormControl>
                      </div>
                    </div>
                    <div className='AddCursos_Formulario-content'>
                      <h4>Precio</h4>
                      <div className='AddProductos_Formulario_input input_Tooltip'>
                        <StyledTextField
                          name='preciobase: '
                          label="Precio base"
                          variant="outlined"
                          size="small"
                          type='number'
                          color="secondary"
                          placeholder="000.000"
                          value={values.preciobase}
                          onChange={(e) => setFieldValue('preciobase', e.target.value)}
                        />
                        <Tooltip title="Precio regular del producto" placement="top" disableInteractive >
                          <IonIcon className='icono' icon={helpCircleOutline} />
                        </Tooltip>
                      </div>
                      <div className='AddProductos_Formulario_input'>
                        <StyledTextField
                          name='porcentajeDescuento'
                          label="Descuento en porcentaje"
                          variant="outlined"
                          size="small"
                          type='number'
                          color="secondary"
                          placeholder="0"
                          value={values.porcentajeDescuento}
                          onChange={(e) => setFieldValue('porcentajeDescuento', e.target.value)}
                        />
                      </div>
                      <div className='AddProductos_Formulario_input input_fecha'>
                        <ErrorMessage name='fechaFin' component={() => <p className='Error'>{errors.fechaDescuento}</p>} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker
                              className='Pickers'
                              label="FECHA FIN"
                              value={values.fechaDescuento}
                              onChange={(date) => setFieldValue('fechaDescuento', date)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>
                      <div className='AddProductos_Formulario_input input_Tooltip'>
                        <StyledTextField
                          name='precioFinal'
                          label="Precio final"
                          variant="outlined"
                          size="small"
                          type='number'
                          color="secondary"
                          placeholder="0"
                          value={values.precioFinal}
                          onChange={(e) => setFieldValue('precioFinal', e.target.value)}
                        />
                        <Tooltip title="Precio final del producto" placement="top" disableInteractive >
                          <IonIcon className='icono' icon={helpCircleOutline} />
                        </Tooltip>
                      </div>
                    </div>
                    <div className='AddCursos_Formulario-content'>
                      <h4>Agregar tallas</h4>
                      <div className='AddProductos_Formulario_input '>
                        <StyledTextField
                          id="outlined-select-currency"
                          select
                          label="Seleccione la talla"
                          size="small"
                          variant="outlined"
                          value={nombreTalla}
                          onChange={(e) => setNombreTalla(e.target.value)}
                        >
                          <MenuItem value={'0'}> Seleccione</MenuItem>
                          <MenuItem value={'XS'}>XS</MenuItem>
                          <MenuItem value={'S'}>S</MenuItem>
                          <MenuItem value={'M'}>M</MenuItem>
                          <MenuItem value={'L'}>L</MenuItem>
                          <MenuItem value={'XL'}>XL</MenuItem>
                        </StyledTextField>
                        <div className='AddProductos_Formulario_input'>
                          <StyledTextField
                            name='porcentajeTalla'
                            label="Porcentaje mas del valor"
                            variant="outlined"
                            size="small"
                            type='number'
                            color="secondary"
                            placeholder="0"
                            value={porcentajeTalla}
                            onChange={(e) => setPorcentajeTalla(e.target.value)}
                          />
                        </div>
                        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          startIcon={<IonIcon className='' icon={bodyOutline} />}
                          onClick={handleTalla}
                        >
                          Agregar
                        </Button>
                      </div>
                      <div className='AddProductos_Formulario_input Formulario_Table'>
                        {Tallas.length > 0 && (
                          <Table
                            data={Tallas}
                            verBotonEliminar={true}
                            eliminarRegistro={handleDeleteTalla}
                          />)}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  style={{ display: 'none' }}
                  ref={submitButtonRef}
                >
                  enviar
                </button>
                <i className='mensaje'>{msg}</i>
              </Form>
            );
          }}
        </Formik>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {props.idProducto == 0 ? (
            "¡Producto guardado exitosamente!"
          ) : (
            "¡Producto actualizada exitosamente!"
          )}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AddProductos