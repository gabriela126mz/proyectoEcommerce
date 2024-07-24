import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ProductModal = ({ showModal, closeModal, handleSave, editedProduct }) => {
  const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm({
    defaultValues: {
      title: editedProduct.title,
      description: editedProduct.description,
      price: editedProduct.price,
      id: editedProduct.id 
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    setValue('title', editedProduct.title);
    setValue('description', editedProduct.description);
    setValue('price', editedProduct.price);
    setValue('id', editedProduct.id); 
  }, [editedProduct, setValue]);

  const onSubmit = (data) => {
    handleSave(data);
    closeModal();
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{editedProduct.id !== null ? 'Editar Producto' : 'Añadir Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Título del Producto</label>
            <input
              type="text"
              className="form-control"
              {...register('title', {
                required: 'Por favor, ingrese el título del producto.',
                minLength: {
                  value: 5,
                  message: 'El título debe tener al menos 5 caracteres.',
                },
                maxLength: {
                  value: 10,
                  message: 'El título no puede tener más de 10 caracteres.',
                },
              })}
            />
            {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
          </div>
          <div>
            <label>Descripción del Producto</label>
            <textarea
              className="form-control"
              {...register('description', {
                required: 'Por favor, ingrese una descripción del producto.',
                minLength: {
                  value: 10,
                  message: 'La descripción debe tener al menos 10 caracteres.',
                },
                maxLength: {
                  value: 25,
                  message: 'La descripción no puede tener más de 25 caracteres.',
                },
              })}
            />
            {errors.description && <span style={{ color: 'red' }}>{errors.description.message}</span>}
          </div>
          <div>
            <label>Precio del Producto</label>
            <input
              type="number"
              className="form-control"
              {...register('price', {
                required: 'Por favor, ingrese el precio del producto.',
                min: {
                  value: 0.01,
                  message: 'El precio debe ser mayor que 0.',
                },
                valueAsNumber: true,
              })}
              placeholder="Ingrese el precio del producto"
            />
            {errors.price && <span style={{ color: 'red' }}>{errors.price.message}</span>}
          </div>
          <Button variant="primary" type="submit" disabled={!isValid}>
            {editedProduct.id !== null ? 'Guardar Cambios' : 'Añadir Producto'}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
